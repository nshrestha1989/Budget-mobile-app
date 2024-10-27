import React, { useEffect, useRef, useState, useTransition } from "react";
import {
  Page,
  Navbar,
  Icon,
  BlockTitle,
  Button,
  Block,
  Input,
  Card,
} from "framework7-react";
import LineChart from "../components/Charts/LineChart";
import { useAuth } from "@/features/auth/api/login";
import { useRouter } from "@/hooks/useRouter";
import { useAccounts } from "@/features/account/hooks/getAccounts";
import { useTrasactions } from "@/features/Records/hooks/useTransactions";
import PieChart from "@/components/Charts/PieChart";

import { RequestsListLimited } from "./RequestsListLimited";
import { SwiperRef } from "@/swiper";

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
  const swiperRef = useRef<SwiperRef>(null);
  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.initialize();
    }
  }, []);
  return (
    <Page name="Dashboard" className="bg-slate-200	">
      <div className="flex justify-end bg-green-400 pb-2 pr-2 pt-2">
        <Icon material="notifications" color="white" className="mr-2" />
        <span onClick={() => alert("Create new fucntion")}>
          {" "}
          <Icon material="settings" color="white" />
        </span>
      </div>

      <div className="bg-green-400 pb-12">
        <Block className="m-0 grid grid-cols-2 p-0 ">
          {accountData.map((account) => (
            <div
              key={account.$id}
              onClick={() => handleAccountSelection(account.$id)}
            >
              <Card className={`bg-white-700 " rounded-md text-black `}>
                <div className="flex flex-col ">
                  <span>
                    <Icon
                      material="account_balance_wallet"
                      color="blue"
                      className="ml-2 pt-1"
                    />
                  </span>

                  <span className="text-md text-md ml-2 pt-1 text-left">
                    {account.AccountName || "Unknown Account"}
                  </span>
                  <span className="text-md mt-1 pb-1 pl-2 text-left  ">
                    <span className="font-semibold">
                      ${account.InitialBalance}{" "}
                    </span>
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
                <span className="text-md mt-0 flex grid grid-rows-1  justify-center p-2.5 text-gray-700">
                  <Icon
                    material="add_circle"
                    className="mb-1 ml-6 text-sky-600"
                    size={"32px"}
                  />
                  <span className="mr-6">Add Account</span>
                </span>
              </div>
            </Card>
          </div>
        </Block>
      </div>

      <div className="-mt-12 w-full  [&_swiper-container_swiper-slide]:w-[90%] [&_swiper-container_swiper-slide]:m-0">
        <swiper-container slides-per-view="auto" >
          <swiper-slide>
            <Card className={`bg-white-700  h-36 rounded-md p-2 text-black`}>
              <div className="relative flex h-full flex-col ">
                <span className="text-md flex items-center   text-gray-700">
                  <Icon
                    material="account_balance"
                    className="mr-3  text-sky-600"
                    size="34px"
                  />

                  <span className="-mt-4 font-semibold">Connect your Bank</span>
                </span>
                <span className="-mt-2 mb-2 ml-12">
                  Synchorinise your transactions Automatically. No more manual
                  adding.
                </span>
                <Button className="absolute bottom-0   w-full border border-gray-300 bg-blue-100 text-gray-900">
                  Connect bank
                </Button>
              </div>
            </Card>
          </swiper-slide>
          <swiper-slide>
            <Card className={`bg-white-700  h-36 rounded-md p-2 text-black`}>
              <div className="relative flex h-full flex-col ">
                <span className="text-md flex items-center   text-gray-700">
                  <Icon
                    material="group"
                    className="mr-3  text-sky-600"
                    size="34px"
                  />

                  <span className="-mt-4 font-semibold">Connect your family</span>
                </span>
                <span className="-mt-2 mb-2 ml-12 ">
                  Share accounts to stay updated on your family finances.
                </span>
                <Button className="absolute bottom-0   w-full border border-gray-300 bg-blue-100 text-gray-900">
                  Invite members
                </Button>
              </div>
            </Card>
          </swiper-slide>
        </swiper-container>
      </div>

      <Block strong inset className="m-1">
        <BlockTitle className="ml-2 ml-4 pb-4 border-b border-gray-300 text-lg ">Balance Trend</BlockTitle>
        
        <BlockTitle className="m-1 mb-2 ml-0 ">
  <span className="text-gray-500">TODAY</span>
  <div className="mt-1 text-2xl font-bold">
    ${getTotalAmount() + getInitialBalance() - getTotalExpenses()}
  </div>
</BlockTitle>
        <LineChart />  

        <p  onClick={() => {
    router.navigate("/records/list/");}} className="text-right mr-4 text-blue-600/75">
          Show More
        </p>
      </Block>
      <Block strong inset>
        <PieChart />
      </Block>
      <RequestsListLimited />

      <Block strong inset>
        <BlockTitle>Notes</BlockTitle>
        <Button className="absolute right-0 top-0">
          <Icon material="add_circle" />
        </Button>
        <Block strong inset className="grid">
          <Input type="textarea" validate />
        </Block>
      </Block>

      <Block strong inset>
        <Button fill onClick={handleSignOut} className="bg-indigo-500">
          SIGN OUT
        </Button>
      </Block>
    </Page>
  );
};

export default DashBoard;
