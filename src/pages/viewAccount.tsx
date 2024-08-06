import { Page, Navbar, BlockTitle, Block, List, ListInput, Button} from 'framework7-react';
const ViewAccount = (props:any) => {
  const accountId = props.f7route.params.id;
 
 const currentAccount={
  type :"Cash",
  total:200
 }
  return (
    <Page name="account">
      <Navbar title={currentAccount.type} backLink="Back" />
      <BlockTitle>About {currentAccount.type}</BlockTitle>
      <Block>{currentAccount.total}</Block>
    </Page>
  );
};

export default ViewAccount;
