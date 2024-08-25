import {
  Navbar,
  NavLeft,
  NavTitle,
  NavRight,
  BlockTitle,
  Block,
  Button,
} from "framework7-react";

import { PageLayout } from "@/components/layout/page-layout";
import { MenuIcon } from "@/components/menu-panels";


export default () => {
  return (
    <PageLayout>
      <Navbar sliding={false}>
        <NavLeft>
          <MenuIcon panelToOpen={"auth-menu-panel"} />
        </NavLeft>
        <NavTitle>Family Budget</NavTitle>
        <NavRight></NavRight>
      </Navbar>

      <BlockTitle large className="font-bold">
        <h1 className="text-center">Welcome</h1>
      </BlockTitle>
      <div className="flex items-center justify-center">
        {/* <img src="/Test-Logo.png" className="max-w-80" /> */}
      </div>
      <Block>
        <h2 className="text-xl">Please login to your account</h2>
      </Block>
      <Block>
        <p className="grid-gap grid grid-cols-1">
          <Button large fill href="/auth/login/">
            SIGN IN
          </Button>
          <Button large outline href="/auth/signup/">
            CREATE AN ACCOUNT
          </Button>
        </p>
      </Block>
      <Block></Block>
      <div className="fixed bottom-0 w-full">
        <div className="w-full pb-10">
         
        </div>
      </div>
    </PageLayout>
  );
};
