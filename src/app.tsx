import React, { useState, useEffect } from "react";

import { f7ready, App, View, Views, Toolbar, Link } from "framework7-react";


import { QueryClientProvider } from "../src/lib/react-query";
import { AppProps } from "framework7-react/components/app";
import MenuPanel from "../src/components/menu-panels";
import 'regenerator-runtime/runtime';
import routes from "./routes";

const AppContainer = () => {

  const f7params: AppProps = {
    name: "FamilyBudget", 
    theme: "auto", // Automatic theme detection
    colors: {
      primary: "#1887be",
    },
    // App routes
    routes: routes,
  };
  f7ready(() => {
    // Call F7 APIs here
  });

  return (
    <QueryClientProvider>
      <App {...f7params}>
        <MenuPanel />

        <Views tabs className="safe-areas">
          {/* Tabbar for switching views-tabs */}
          <Toolbar tabbar icons bottom>
            <Link tabLink="#view-home" tabLinkActive iconIos="f7:house_fill" iconMd="material:dashboard" text="Dashboard" />
            <Link tabLink="#view-family" iconIos="f7:square_list_fill" iconMd="material:diversity_3" text="Family" />
            <Link tabLink="#view-settings" iconIos="f7:gear" iconMd="material:settings" text="Settings" />
          </Toolbar>

          {/* Your main view/tab, should have "view-main" class. It also has "tabActive" prop */}
          <View id="view-home" main tab tabActive url="/" />

          {/* Catalog View */}
          <View id="view-family" name="family" tab url="/family/" />

          {/* Settings View */}
          <View id="view-settings" name="settings" tab url="/settings/" />

        </Views>
      </App>
     
    </QueryClientProvider>
  );
};
export default AppContainer;
