import { PageLayout } from "@/components/layout/page-layout";
import { RecordForm } from "@/features/Records/component/RecordForm";
import { NavTitle, Navbar } from "framework7-react";

interface Props {
  transactionId?: string; 
}

const RecordPage: React.FC<Props> = ({ transactionId }) => {
  return (
    <PageLayout requireAuth>
      <Navbar >
        <NavTitle>{!transactionId ? "Add" : "Edit"} Record</NavTitle>
      </Navbar>
      <RecordForm transactionId={transactionId} />
    </PageLayout>
  );
};

export default RecordPage;
