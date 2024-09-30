import React from 'react';
import { PageLayout } from "@/components/layout/page-layout";
import { Navbar, NavTitle,  } from "framework7-react";
import RecordLists from "./RecordLists";
import { useRouter } from '@/hooks/useRouter';

const RecordsPage = () => {
  return (
    <PageLayout requireAuth>
      <Navbar backLink="Back" >
        <NavTitle>Records</NavTitle>
      </Navbar>
      <RecordLists />
    </PageLayout>
  );
};

export default RecordsPage;
