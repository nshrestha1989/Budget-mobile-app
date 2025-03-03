import { Badge, Button, Icon, Link, ListItem, Navbar, Page, Popup } from "framework7-react";
import { Record } from "../types";
import { cn, formatDate } from "@/lib/utils";
import { useRouter } from "@/hooks/useRouter";
import PopupContainer from "@/components/ui/PopUpConatainer";
import RecordLists from "@/pages/RecordLists";
import RecordDetail from "@/pages/RecordDetail";
import { useState } from "react";

export const RequestsListItem = ({
  request,
  className,
  onClick,
}: {
  request: Record;
  className?: HTMLDivElement["className"];
  onClick?: (request: Record) => void; // Add a click handler specific to the item
}) => {
  const [popupOpened, setPopupOpened] = useState(false);

  return (<>
    <ListItem
    
      className={cn(className)}
     
    >
      <div>
        <div className="text-muted">
          <div>Date: {formatDate(request.transactionDate)}</div>
        </div>
        <div className="font-medium text-primary">
          {request.categories?.categoryname}
        </div>
        <div className="text-muted">
          <div>Description: {request.description}</div>
        </div>
      </div>
      <div>
        <div className={request.isIncome ? "text-green-600/100" : "text-red-600/100"}>
          <div>
            {!request.isIncome && "-"}
            {request.amount}
          </div>
        </div>
      </div>

      <Button onClick={() => setPopupOpened(true)}>          <Icon material="navigate_next" />
      </Button>
        <Popup
          opened={popupOpened}
          onPopupClosed={() => setPopupOpened(false)}
        >
          <Page>
            <Navbar title="Record Detail">
              <Link popupClose>Close</Link>
            </Navbar>
            <RecordDetail transactionId={request.transactionId} />
          </Page>
        </Popup>
    
    </ListItem>
  
    </>
  );
};
RequestsListItem.displayName = "f7-list-item";
