import { PageLayout } from "@/components/layout/page-layout";

import { RecordForm } from "@/features/Records/component/RecordForm";
import { useRouter } from "@/hooks/useRouter";
import { NavTitle, Navbar } from "framework7-react";

export default () => {
  const router = useRouter();
  const transcationIdParam = router.currentRoute.params;
  const transcationId = transcationIdParam.transcationId;
  const isNew = !transcationId;
  return (
    <PageLayout requireAuth>
      <Navbar backLink="Back">
        <NavTitle>{isNew ? "New" : "Edit"} Record</NavTitle>
      </Navbar>
      <RecordForm transactionId={transcationId}/>
    </PageLayout>
  );
};
