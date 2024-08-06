import {
  BlockTitle,
  Link,
  List,
  ListItem,
  Page,
  Panel,
  View,
} from "framework7-react";
import { RESOURCE_RUL } from "@/constants/urls";

export type MenuPanel = "auth-menu-panel" | "home-menu-panel";

export default ({}) => {
  return (
    <>
      <Panel left floating id={"auth-menu-panel" as MenuPanel}>
        <View linksView=".view-main">
          <Page>
            <BlockTitle medium className="text-primary">
              Main Menu
            </BlockTitle>
            <List>
              <ListItem title="About" link="/about/" panelClose />
              <ListItem
                title="Who Can Use"
                link="#"
                panelClose
              />
              <ListItem
                title="Frequently Asked Questions"
                link="#"
                panelClose
              />
              <ListItem
                title="Resources"
                link={RESOURCE_RUL}
                external
                target="_blank"
                panelClose
              />
              <ListItem title="Back to sign-in" link="/auth/" panelClose />
            </List>
          </Page>
        </View>
      </Panel>
      <Panel left floating id={"home-menu-panel" as MenuPanel}>
        <View linksView=".view-main">
          <Page>
            <BlockTitle medium className="text-primary">
              Main Menu
            </BlockTitle>
            <List>
              <ListItem
                title="Products Catalogue"
                link="/products/"
                panelClose
              />
              <ListItem
                title="Resources"
                link={RESOURCE_RUL}
                external
                target="_blank"
                panelClose
              />
              <ListItem
                title="Returns/Warranty"
                link="#"
                panelClose
                view="main"
              />
              <ListItem title="Feedback" link="#" panelClose />
              <ListItem title="Support" link="#" panelClose />
              <ListItem title="My Account" link="#" panelClose />
            </List>
          </Page>
        </View>
      </Panel>
    </>
  );
};

export const MenuIcon = ({ panelToOpen }: { panelToOpen: MenuPanel }) => {
  return (
    <Link iconIos="f7:menu" iconMd="f7:menu" panelOpen={"#" + panelToOpen} />
  );
};
