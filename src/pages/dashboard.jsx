import React from 'react';
import {
  Page,
  Navbar,
  List,
  ListInput,
  ListItem,
  Toggle,
  Icon,
  BlockTitle,
  Button,
  Range,
  Block,
} from 'framework7-react';


import LineChart from '../components/LineChart';

const DashBoard = () => (

  
  <Page name="form">
    <Navbar title="Form" backLink="Back"></Navbar>

    
    <BlockTitle>Accounts</BlockTitle>
    <Block strongIos outlineIos className="grid grid-cols-2 grid-gap">
      <Button raised>Cash</Button>
      <Button raised>Add Account</Button>
      <Button raised>Add Account</Button>
      <Button raised>Add Account</Button>
    </Block>
    <BlockTitle>Balance Trend</BlockTitle>
    <Block strongIos outlineIos className="grid ">
     <LineChart />
    </Block>
    <BlockTitle>Notes</BlockTitle>
    <Block strongIos outlineIos className="grid justify-content-flex-end">
    <Icon material="add_circle"></Icon>
    </Block>
     <Block strongIos outlineIos className="grid ">
    <p>
        Here comes paragraph within content block. Donec et nulla auctor massa pharetra adipiscing
        ut sit amet sem. Suspendisse molestie velit vitae mattis tincidunt. Ut sit amet quam mollis,
        vulputate turpis vel, sagittis felis.{' '}
      </p>
    </Block>
  </Page>
);

export default DashBoard;
