import { useAccounts } from '@/features/account/hooks/getAccounts';
import { EmptyRequestsListItem } from '@/features/Records/component/EmptyRequestListItem';
import { RequestsListItem } from '@/features/Records/component/RequestListItem';
import { useTrasaction } from '@/features/Records/hooks/useTransactions';
import { useRouter } from '@/hooks/useRouter';
import { Block, Button, Fab, FabButton, FabButtons, Icon, List, ListItem } from 'framework7-react';
import React from 'react'

export default function RecordLists(props:any) {
  const router = useRouter();
    const { data, isLoading,  isPending, refetch } =  useTrasaction({});

  return (
    <div>


<List>
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
              router.navigate("/request/new/");
            }}
          >
            <Icon ios="f7:pencil" md="f7:pencil" />
          </FabButton>
          <FabButton label="Edit Record" fabClose>
            <Icon ios="f7:checkmark_alt" md="f7:checkmark_alt" />
          </FabButton>
        </FabButtons>
      </Fab>
    
    </div>
  )
}
