
import { EmptyRequestsListItem } from '@/features/Records/component/EmptyRequestListItem';
import { RequestsListItem } from '@/features/Records/component/RequestListItem';
import { useTrasactions } from '@/features/Records/hooks/useTransactions';
import { useRouter } from '@/hooks/useRouter';
import { Fab, FabButton, FabButtons, Icon, List, ListItem } from 'framework7-react';


export default function RecordLists() {
  const router = useRouter();
    const { data, isPending } =  useTrasactions({});

  return (
    <div>


<List dividersIos  outlineIos strongIos>
        {isPending &&
          Array(3)
            .fill(0)
            .map((_, index) => <EmptyRequestsListItem key={index} />)}
        {data?.map((request, index) => (
          <RequestsListItem key={index} request={request} />
        ))}
        {data?.length === 0 && !isPending && (
          <ListItem>No requests found</ListItem>
        )}
      </List>
      <Fab position="right-bottom" slot="fixed">
        <Icon ios="f7:plus" md="material:add" />
        <Icon ios="f7:xmark" md="material:close" />
        <FabButtons position="top">
          <FabButton
            label="New Record"
            fabClose
            onClick={() => {
              router.navigate("/records/new/");
            }}
          >
            <Icon ios="f7:pencil" md="f7:pencil" />
          </FabButton>
          <FabButton label="Transfer" fabClose>
            <Icon ios="f7:checkmark_alt" md="f7:checkmark_alt" />
          </FabButton>
        </FabButtons>
      </Fab>
    
    </div>
  )
}
