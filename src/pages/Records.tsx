import { PageLayout } from "@/components/layout/page-layout";
import { AccountForm } from "@/features/account/component/AccountForm";
import { useRouter } from "@/hooks/useRouter";
import { Navbar, NavTitle } from "framework7-react";
import RecordLists from "./RecordLists";

export default   () =>{
    const router = useRouter();
    const accountIdParam = router.currentRoute.params;
    const recordId = accountIdParam.recordId;
    const isNew = !recordId;

  return (
    <PageLayout requireAuth>
    <Navbar backLink="Back">
      <NavTitle>{isNew ? "New" : "Edit"} Records</NavTitle>
    </Navbar>
    <RecordLists recordId={recordId}/>
  </PageLayout>
  )
}
