import React, { useState } from "react";
import { Page, Navbar, NavTitle, BlockTitle } from "framework7-react";

import { PageLayout } from "@/components/layout/page-layout";
import { SignupForm } from "@/features/auth/components/SignupForm";
import { useRouter } from "@/hooks/useRouter";

export default () => {
  const router = useRouter();
  return (
    <PageLayout>
      <Navbar sliding={true} backLink="Back">
        <NavTitle>Create Account</NavTitle>
      </Navbar>

      <BlockTitle large className="text-center">
        Welcome 
      </BlockTitle>
      <div className="flex items-center justify-center">
        {/* <img src="/test-Logo.png" className="max-w-80" /> */}
      </div>
      <SignupForm 
      onSuccess={() => {
        router.navigate("/dashboard/");
      }}
      />
    </PageLayout>
  );
};
