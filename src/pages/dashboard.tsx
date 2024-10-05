import React, { useState, useTransition } from "react";
import {
  Page,
  Navbar,
  List,
  Icon,
  BlockTitle,
  Button,
  Block,
  f7,
  Input,
  Card,
} from "framework7-react";
import LineChart from "../components/Charts/LineChart";
import { useAuth } from "@/features/auth/api/login";
import { useRouter } from "@/hooks/useRouter";
import { useAccounts } from "@/features/account/hooks/getAccounts";
import { useCategories } from "@/features/category/hooks/UseCategory";
import { useTrasactions } from "@/features/Records/hooks/useTransactions";
import PieChart from "@/components/Charts/PieChart";
import { useAccountStore } from "@/features/account/hooks/accountStore";


const DashBoard = () => {
  const router = useRouter();
  const { logout } = useAuth();

  const { data:accountData=[]} =  useAccounts({});
  const { selectedAccountIds, addSelectedAccountId, removeSelectedAccountId } = useAccountStore(); 




  const handleAccountSelection = (id: string) => {
    if (selectedAccountIds.includes(id)) {
      removeSelectedAccountId(id); // Deselect account
    } else {
      addSelectedAccountId(id); // Select account
    }
  };


  const handleSignOut = async ()=>{
    const valid = await logout.mutateAsync();
  }
  const { data: transactionData } = useTrasactions({});

  const getInitialBalance =()=>{
   return accountData.reduce((total,doc)=> total + doc.InitialBalance!,0)
  }
  const getTotalAmount = () => {
    if (!transactionData) return 0; 
    return transactionData.filter(x=>x.isIncome).reduce((total, doc) => total + doc.amount, 0);
  };

  const getTotalExpenses = () => {
    if (!transactionData) return 0; 
    return transactionData.filter(x=>!x.isIncome).reduce((total, doc) => total + doc.amount, 0);
  };
  return (
    <Page name="Dashboard">
      <Navbar title="Dashboard" />
      <Block strongIos outlineIos className="grid grid-cols-2">
        <BlockTitle className="font-bold">List of Accounts</BlockTitle>
        <div className="relative ">
                <div 
          className="absolute bottom-3 right-0" 
          onClick={() => {
            router.navigate("/accounts/list/");  
          }}
        > 
          <Icon material="settings" className="left-0" />
        </div>
      </div>
      </Block>

      <Block strongIos outlineIos className="grid grid-cols-2 p-0 m-0">
      {accountData.map((account) => (
  <div
  key={account.$id}
  onClick={() => handleAccountSelection(account.$id)} 

>
  <Card
    className={`rounded-md ${selectedAccountIds.includes(account.$id) ? "bg-blue-500 text-white" : "bg-gray-200 text-black"}`} // Added 'rounded-none' to remove border-radius
    >
    <div className="flex flex-col">
      <span className="text-md pl-2 pt-1 text-md text-gray-800 text-left">{account.AccountName || "Unknown Account"}</span>
      <span className="mt-1 pl-2 pb-1 text-md text-gray-800 text-left">${account.InitialBalance}</span> 
    </div>
  </Card>
</div>

 

  
   
      ))}
        <Button className="mt-2 mx-2" outline 
         onClick={() => {
          router.navigate("/account/new/");
        }}
        >
          <Icon material="add_circle" />
          Add Account
        </Button>
     
      </Block>
      <div className="flex justify-end top-0">
      <Button 
                   onClick={() => {
                     router.navigate("/records/list/");
                   }}
                 >
                 <Icon material="list"  />
      </Button>
     
    </div>
 
      <BlockTitle className="m-1 ml-4">Balance Trend</BlockTitle>
      <BlockTitle className="m-1 ml-4 mb-2">{getTotalAmount()+getInitialBalance()-getTotalExpenses()}</BlockTitle>
      <Block strongIos outlineIos className="grid ">
       <LineChart />
      
      </Block>
      <Block strongIos outlineIos className="grid ">
      <PieChart/>
      
      </Block>

      <BlockTitle>Notes</BlockTitle>
      <Block strongIos outlineIos className="">
        <Button className="absolute right-0 bottom-1">
          <Icon material="add_circle" />
        </Button>
      </Block>
      <Block strongIos outlineIos className="grid">
        <Input type="textarea" validate />
      </Block>

      <Block strongIos outlineIos className="grid">
        <div>
          <Button fill onClick={handleSignOut}>
          SIGN OUT
          </Button>
        </div>
      </Block>
    </Page>
  );
};

export default DashBoard;
