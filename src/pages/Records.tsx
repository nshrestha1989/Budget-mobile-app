import React from 'react';
import { PageLayout } from "@/components/layout/page-layout";
import { Navbar, NavTitle,  } from "framework7-react";
import RecordLists from "./RecordLists";
import { useRouter } from '@/hooks/useRouter';

const RecordsPage = () => {
  const f7router = useRouter(); // Access the Framework7 router instance

  // Handle the back button click event
  const handleBackClick = (e: Event) => {
    e.preventDefault(); // Prevent the default back navigation
    f7router.navigate('/dashboard/', { force: true });
  };

  return (
    <PageLayout requireAuth>
      <Navbar backLink="Back" onBackClick={handleBackClick}>
        <NavTitle>Records</NavTitle>
      </Navbar>
      <RecordLists />
    </PageLayout>
  );
};

export default RecordsPage;
