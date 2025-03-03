import {
    Button,
    Popup,
    Navbar,
    Page,
    Link,
  } from "framework7-react";
  import { useState } from "react";
  
  interface PopupContainerProps {
    pushPopupContent: React.ReactNode;
    promptText:string // Accepts React components as content
  }
  
  const PopupContainer = ({ pushPopupContent , promptText}: PopupContainerProps) => {
    const [popupOpened, setPopupOpened] = useState(false);
  
    return (
      <>
        <Button onClick={() => setPopupOpened(true)}>Open Popup</Button>
        <Popup
          opened={popupOpened}
          onPopupClosed={() => setPopupOpened(false)}
        >
          <Page>
            <Navbar title="Dynamic Content Popup">
              <Link popupClose>Close</Link>
            </Navbar>
            {pushPopupContent}
          </Page>
        </Popup>
      </>
    );
  };
  
  export default PopupContainer;
  