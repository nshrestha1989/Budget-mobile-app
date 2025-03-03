import { useRouter } from '@/hooks/useRouter';
import { EmptyRequestsListItem } from '@/features/Records/component/EmptyRequestListItem';
import { RequestsListItem } from '@/features/Records/component/RequestListItem';
import { Record } from '@/features/Records/types';
import { Fab, FabButton, FabButtons, Icon, Link, List, Navbar, Page, Popup } from 'framework7-react';
import { useState } from 'react';
import RecordDetail from './RecordDetail';

interface RecordListsProps {
  transactions: Record[]; 
  // Replace 'Record' with the appropriate type if needed
}

export default function RecordLists({ transactions }: RecordListsProps) {
  const router = useRouter();
  const [popupOpened, setPopupOpened] = useState(false);

  return (
    <>
     
      <List dividersIos outlineIos strongIos>
        {/* {
          Array(3)
            .fill(0)
            .map((_, index) => <EmptyRequestsListItem key={index} />)} */}
        {transactions.length >0 && transactions.map((request, index) => (
          <RequestsListItem key={`${index}`} request={request} />
        ))}

      </List>
      <Fab position="right-bottom" slot="fixed" style={{position:"fixed"}}  >
        <Icon ios="f7:plus" md="material:add" />
        <Icon ios="f7:xmark" md="material:close" />
        <FabButtons position="top">
          <FabButton
            label="New Record"
            fabClose
            onClick={() => setPopupOpened(true)}
          >
            <Icon ios="f7:pencil" md="f7:pencil" />
          </FabButton>
          <FabButton label="Transfer" fabClose>
            <Icon ios="f7:checkmark_alt" md="f7:checkmark_alt" />
          </FabButton>
        </FabButtons>
      </Fab>
      <Popup
          opened={popupOpened}
          onPopupClosed={() => setPopupOpened(false)}
        >
          <Page>
            <Navbar title="Record Detail">
              <Link popupClose>Close</Link>
            </Navbar>
            <RecordDetail />
          </Page>
        </Popup>
    </>
  );
}
