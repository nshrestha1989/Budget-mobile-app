import React, { useState } from "react";
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

const DashBoard = () => {
  const router = useRouter();
  const [accounts, setAccounts] = useState<string[]>([]);
  const { logout } = useAuth();

  const { data:accountData=[], isLoading,  isPending, refetch } =  useAccounts({});

  const addAccount = () => {
    f7.dialog.prompt("Enter account name:", (accountName) => {
      if (accountName && !accounts.includes(accountName)) {
        setAccounts([...accounts, accountName]);
      } else if (accounts.includes(accountName)) {
        f7.dialog.alert("Account already exists.");
      }
    });
  };

  const handleButtonClick = (id: number) => {
    f7.views.main.router.navigate(`/product/${id}/`);
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
            onClick={() => handleButtonClick(index)}
          >
           {account.accountName || "Unknown Account"}

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
          <Icon material="list" />
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
