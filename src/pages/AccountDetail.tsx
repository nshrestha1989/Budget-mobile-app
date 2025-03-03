import { PageLayout } from "@/components/layout/page-layout";
import { AccountForm } from "@/features/account/component/AccountForm";
import { useRouter } from "@/hooks/useRouter";
import { NavTitle, Navbar } from "framework7-react";

export default () => {
  const router = useRouter();
  const accountIdParam = router.currentRoute.params;
  const accountId = accountIdParam.accountId;
  const isNew = !accountId;
  return (
    <PageLayout requireAuth >
      <Navbar backLink="Back">
        <NavTitle>{isNew ? "New" : "Edit"} Accounts</NavTitle>
      </Navbar>
      <AccountForm accountId={accountId} />
    </PageLayout>
  );
};
