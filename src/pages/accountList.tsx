import { useAccounts } from '@/features/account/hooks/getAccounts';
import { AccountListItem } from '@/features/Records/component/AccountListItem';
import { EmptyRequestsListItem } from '@/features/Records/component/EmptyRequestListItem';
import { useRouter } from '@/hooks/useRouter';
import { Fab, FabButton, FabButtons, Icon, List, ListItem } from 'framework7-react';


export default function AccountLists() {
  const router = useRouter();
  const { data: accounts = [], isPending } = useAccounts({});



  return (
    <div>
      <List dividersIos outlineIos strongIos>
        {/* Display placeholder items if transactions are still loading */}
        {isPending &&
          Array(3)
            .fill(0)
            .map((_, index) => <EmptyRequestsListItem key={index} />)}

        {/* Display filtered transactions */}
        {accounts.map((accounts, index) => (
          <AccountListItem key={index} account={accounts} />
        ))}

        {/* Display message if no transactions are found */}
        {accounts.length === 0 && !isPending && (
          <ListItem>No account found</ListItem>
        )}
      </List>

      {/* Floating Action Button for adding new records or making transfers */}
      <Fab position="right-bottom" slot="fixed">
        <Icon ios="f7:plus" md="material:add" />
        <Icon ios="f7:xmark" md="material:close" />
        <FabButtons position="top">
          <FabButton
            label="New Account"
            fabClose
            onClick={() => {
              router.navigate("/account/new/");
            }}
          >
            <Icon ios="f7:pencil" md="f7:pencil" />
          </FabButton>

        </FabButtons>
      </Fab>
    </div>
  );
}
