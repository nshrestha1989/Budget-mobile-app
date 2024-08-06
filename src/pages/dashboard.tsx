import {
  Page,
  Navbar,
  List,
  Icon,
  BlockTitle,
  Button,
  Block,
  f7,
} from "framework7-react";

import LineChart from "../components/ui/LineChart";

const DashBoard = () => {
  const addAccount = () => {
    console.log("Add Account button clicked");
  };

  const handleButtonClick = (id: any) => {
    f7.views.main.router.navigate(`/product/${id}/`);
  };

  return (
    <Page name="Dashboard" >
      <Navbar title="Dashboard"></Navbar>
      <BlockTitle className="font-bold">Accounts</BlockTitle>
      <Block strongIos outlineIos className="grid grid-cols-2">
        <Button
          key={1}
          fill
          className="m-1"
          onClick={() => handleButtonClick(1)}
        >
          Cash
        </Button>
        <Button
          key={2}
          fill
          className="m-1"
          onClick={() => handleButtonClick(1)}
        >
          Bank
        </Button>
        <Button className="m-2" outline onClick={addAccount}>
          <Icon material="add_circle"></Icon>
          Add Account
        </Button>
      </Block>
      <BlockTitle className="m-1 ml-4" >Balance Trend</BlockTitle>
      <BlockTitle className="m-1 ml-4 mb-2" >$8561</BlockTitle>
      <Block strongIos outlineIos className="grid">
        <LineChart />
      </Block>

      <BlockTitle>Notes</BlockTitle>
      
      <Block strongIos outlineIos className="">
      <Button  className="absolute right-0 bottom-1">
          <Icon material="add_circle"></Icon>
        </Button>
      </Block>
      <Block strongIos outlineIos className="grid">
        <p>
          Here comes paragraph within content block. Donec et nulla auctor massa
          pharetra adipiscing ut sit amet sem. Suspendisse molestie velit vitae
          mattis tincidunt. Ut sit amet quam mollis, vulputate turpis vel,
          sagittis felis.
        </p>
      </Block>
    </Page>
  );
};

export default DashBoard;
