import {
  Navbar,
  NavTitle,
  BlockTitle,
  Block,
} from "framework7-react";

import { useRouter } from "@/hooks/useRouter";
import { PageLayout } from "@/components/layout/page-layout";
import { LoginForm } from "@/features/auth/components/LoginForm";

export default () => {
  const router = useRouter();

  return (
    <PageLayout>
      <Navbar sliding={true} backLink="Back">
        <NavTitle>Sign In</NavTitle>
      </Navbar>

      <BlockTitle large className="text-center">
        Welcome 
      </BlockTitle>
      <div className="flex items-center justify-center">
      </div>
      <Block>
        <h2 className="text-xl">Sign in to your account</h2>
      </Block>
      <LoginForm
        onSuccess={() => {
          router.navigate("/dashboard/");
        }}
      />
    </PageLayout>
  );
};
