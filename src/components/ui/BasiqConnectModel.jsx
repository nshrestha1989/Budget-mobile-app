import React, { useState, useEffect, useRef } from "react";
import BasiqConnect from "@basiq/basiq-connect-control";
import {
  Navbar,
  Page,
  Popup,
  BlockTitle,
  Block,
  NavRight,
  Link,
  View,
} from "framework7-react";
import axios from "axios";

export const BasiqConnectModal = ({ isOpen, onClose }) => {
  const userId = "f622f103-c9a0-4ba4-971e-eed40defa369";
  const popup = useRef(null);

  useEffect(() => {
    const createUser = async () => {
      let access_token = "";
      try {
        const tokenResponse = await axios.post(
          '/api/token',
          { scope: 'SERVER_ACCESS' }, 
          {
            headers: {
              Authorization: `Basic MDE1YWJiMDAtMTIxNS00YTgxLWI1MzgtYzM0MmIzZWQ2ZmMyOmY0MjU3YTIwLTg5NjEtNDUzNS1iZDExLTI0YTFhZTU2NGMwNA==`, // Your API Key
              'Content-Type': 'application/x-www-form-urlencoded',
            }
          }
        );
        access_token = tokenResponse.data.access_token;
      } catch (error) {
        console.error('Error :', error);
      }

      const config = {
        containerId: "basiq-control",
        userID: userId,
        token: access_token,
      };

      BasiqConnect(config);
    };

    createUser();
  }, []);

  return (
    <Popup opened={isOpen} onPopupClosed={onClose}>
      <View>
        <Page>
          <Navbar title="Basiq Connect" large transparent>
            <NavRight>
              <Link popupClose>Close</Link>
            </NavRight>
          </Navbar>
          <Block>
          <div id="basiq-control"></div>
          </Block>
        </Page>
      </View>
    </Popup>
  );
};
