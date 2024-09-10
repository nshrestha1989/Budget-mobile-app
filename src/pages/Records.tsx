import { PageLayout } from "@/components/layout/page-layout";
import { AccountForm } from "@/features/account/component/AccountForm";
import { useRouter } from "@/hooks/useRouter";
import { Navbar, NavTitle } from "framework7-react";
import RecordLists from "./RecordLists";

export default   () =>{


  return (
    <PageLayout requireAuth>
    <Navbar backLink="Back">
      <NavTitle>Records</NavTitle>
    </Navbar>
    <RecordLists/>
  </PageLayout>
  )
}
