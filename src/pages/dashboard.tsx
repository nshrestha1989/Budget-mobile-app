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
        <div className="absolute bottom-3 right-0"> <Icon material="settings" className="left-0" /></div>
      </div>
      </Block>

      <Block strongIos outlineIos className="grid grid-cols-2 m-0">
      {accountData.map((account) => (
        <Button
          key={account.$id}
          fill
          className={`m-2 ${selectedAccountIds.includes(account.$id) ? "bg-blue-500 text-white" : "bg-gray-200 text-black"}`} // Conditionally set button color
          onClick={() => handleAccountSelection(account.$id)}
        >
          {account.AccountName || "Unknown Account"} ${account.InitialBalance}
        </Button>
      ))}
        <Button className="mt-2 mx-2" outline 
         onClick={() => {
          router.navigate("/request/new/");
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
