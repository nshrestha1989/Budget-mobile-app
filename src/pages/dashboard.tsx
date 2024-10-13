import React, { useState, useTransition } from "react";
import {
  Page,
  Navbar,
  Icon,
  BlockTitle,
  Button,
  Block,
  Input,
  Card,
  Fab,
  FabButtons,
  FabButton,
  NavRight,
  Link,
} from "framework7-react";
import LineChart from "../components/Charts/LineChart";
import { useAuth } from "@/features/auth/api/login";
import { useRouter } from "@/hooks/useRouter";
import { useAccounts } from "@/features/account/hooks/getAccounts";
import { useTrasactions } from "@/features/Records/hooks/useTransactions";
import PieChart from "@/components/Charts/PieChart";

import { RequestsListLimited } from "./RequestsListLimited";

const DashBoard = () => {
  const router = useRouter();
  const { logout } = useAuth();

  const { data: accountData = [] } = useAccounts({});

  const handleAccountSelection = (accountId: string) => {
    router.navigate(`/records/list/${accountId}`);
  };

  const handleSignOut = async () => {
    const valid = await logout.mutateAsync();
  };
  const { data: transactionData } = useTrasactions({});

  const getInitialBalance = () => {
    return accountData.reduce((total, doc) => total + doc.InitialBalance!, 0);
  };
  const getTotalAmount = () => {
    if (!transactionData) return 0;
    return transactionData
      .filter((x) => x.isIncome)
      .reduce((total, doc) => total + doc.amount, 0);
  };

  const getTotalExpenses = () => {
    if (!transactionData) return 0;
    return transactionData
      .filter((x) => !x.isIncome)
      .reduce((total, doc) => total + doc.amount, 0);
  };
  return (
    <Page name="Dashboard" className="bg-slate-200	">
       <div className="flex justify-end bg-green-400 pb-2 pt-2 pr-2">
         <Icon material="notifications" color="white" className="mr-2"/>
         <span onClick={()=>alert("Create new fucntion")}> <Icon material="settings" color="white" /></span>
         
        </div>
      <div className="bg-green-400">
       

        <Block strongIos outlineIos className="m-0 grid grid-cols-2 p-0">
          {accountData.map((account) => (
            <div
              key={account.$id}
              onClick={() => handleAccountSelection(account.$id)}
            >
              <Card className={`bg-white-700 " rounded-md text-black `}>
                <div className="flex flex-col ">
                  <span>
                    <Icon material="account_balance_wallet" color ="blue" className="ml-2 pt-1" />
                  </span>

                  <span className="text-md text-md ml-2 pt-1 text-left">
                    {account.AccountName || "Unknown Account"}
                  </span>
                  <span className="text-md mt-1 pb-1 pl-2 text-left  ">
                    
                    <span className="font-semibold">${account.InitialBalance} </span>
                    AUD
                  </span>
                </div>
              </Card>
            </div>
          ))}

          <div
            onClick={() => {
              router.navigate("/account/new/");
            }}
          >
             <Card className={`bg-white-700 " rounded-md text-black `}>
             <div className="flex flex-col">
                <span className="text-md mt-1 p-2.5 flex justify-center  text-gray-700 grid grid-rows-1">
                   <Icon material="add_circle" className="ml-6 mb-1 text-sky-600" size={"34px"}  />
                   <span className="mr-6">
                   Add Account
                   </span>
               
                </span>
              </div>
              </Card>
           
          </div>
        </Block>
      </div>
      <BlockTitle className="ml-2 ml-4">Balance Trend</BlockTitle>
      <BlockTitle className="m-1 mb-2 ml-4">
        {getTotalAmount() + getInitialBalance() - getTotalExpenses()}
      </BlockTitle>
      <Block strong inset >
        <LineChart />
      </Block>
      <Block strong  inset>
        <PieChart />
      </Block>
      <RequestsListLimited />
     

      <BlockTitle>Notes</BlockTitle>
      <Block strongIos  outline>
        <Button className="absolute bottom-1 right-0">
          <Icon material="add_circle" />
        </Button>
      </Block>
      <Block strongIos outlineIos className="grid">
        <Input type="textarea" validate />
      </Block>

      <Block strongIos outlineIos className="grid">
        <div>
          <Button fill onClick={handleSignOut} className="bg-indigo-500">
            SIGN OUT
          </Button>
        </div>
      </Block>
      {/* Floating Action Button for adding new records or making transfers */}
      <Fab position="center-bottom" slot="fixed">
        <Icon ios="f7:plus" md="material:add" />
        <Icon ios="f7:xmark" md="material:close" />
        <FabButtons position="top">
          <FabButton
            label="New Record"
            fabClose
            onClick={() => {
              router.navigate("/records/new/");
            }}
          >
            <Icon ios="f7:pencil" md="f7:pencil" />
          </FabButton>
          <FabButton label="Transfer" fabClose>
            <Icon ios="f7:checkmark_alt" md="f7:checkmark_alt" />
          </FabButton>
        </FabButtons>
      </Fab>
    </Page>
  );
};

export default DashBoard;
