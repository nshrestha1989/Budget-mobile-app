import React, { useState, useEffect } from "react";

import { f7ready, App, View, Views, Toolbar, Link, Icon } from "framework7-react";


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
      primary: "#181717",
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
      <Link 
        tabLink="#view-home" 
        tabLinkActive 
        iconIos="f7:house_fill" 
        iconMd="material:dashboard" 
        text="Dashboard" 
      />
      <Link 
        tabLink="#view-new-record" 
        text="" 
        iconMd = "material:add_circle"
        iconSize = "54px"     
        iconColor="blue"
        className="mt-6"
       
      >
        
        
      </Link>
      <Link 
        tabLink="#view-settings" 
        iconIos="f7:gear" 
        iconMd="material:settings" 
        text="Settings" 
      />
    </Toolbar>

    {/* Dashboard View */}
    <View id="view-home" main tab tabActive url="/dashboard/" />

    {/* New Record View */}
    <View id="view-new-record" name="new-record" tab url="/records/new/" />

    {/* Settings View */}
    <View id="view-settings" name="settings" tab url="/settings/" />
  </Views>
</App>
     
    </QueryClientProvider>
  );
};
export default AppContainer;
