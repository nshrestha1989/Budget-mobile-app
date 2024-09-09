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
import { useTrasaction } from "@/features/Records/hooks/useTransactions";


const DashBoard = () => {
  const router = useRouter();
  const [accounts, setAccounts] = useState<string[]>([]);
  const { logout } = useAuth();
  const { data: categoriesData } = useCategories({});
  const { data } = useTrasaction({});
 console.log(data)
  const { data:accountData=[], isLoading,  isPending, refetch } =  useAccounts({});



  const handleButtonClick = (id: string) => {
    f7.views.main.router.navigate(`/account/${id}/edit/`);
  };

  const handleSignOut = async ()=>{
    const valid = await logout.mutateAsync();
  }

  return (
    <Page name="Dashboard">
      <Navbar title="Dashboard" />
      <Block strongIos outlineIos className="grid grid-cols-2">
        <BlockTitle className="font-bold">List of Accounts</BlockTitle>
        <Icon material="settings" className="left-0" />
      </Block>

      <Block strongIos outlineIos className="grid grid-cols-2">
        {accountData.map((account, index) => (
          <Button
            key={index}
            fill
            className="m-1"
            onClick={() => handleButtonClick(account.accountId)}
          >
           {account.AccountName || "Unknown Account"}

          </Button>
        ))}
        <Button className="m-2" outline 
         onClick={() => {
          router.navigate("/request/new/");
        }}
        
        >
          <Icon material="add_circle" />
          Add Account
        </Button>
        <div></div>
        <div></div>
        <div className="right-0">
          <Button 
            onClick={() => {
              router.navigate("/records/list/");
            }}
          >
          <Icon material="list"  />
          </Button>
     
        </div>
      </Block>

      <BlockTitle className="m-1 ml-4">Balance Trend</BlockTitle>
      <BlockTitle className="m-1 ml-4 mb-2">$8561</BlockTitle>
      <Block strongIos outlineIos className="grid">
        <LineChart />
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
        {/* <BasiqConnectModal isOpen={popupOpened} onClose={closePopup} /> */}
      </Block>
    </Page>
  );
};

export default DashBoard;
