import { useState } from "react";
import { List, ListItem, Button, Block, BlockTitle, Popup, View, Page, Navbar, NavRight, Link } from "framework7-react";

import { useRouter } from "@/hooks/useRouter";
import { RequestsListItem } from "@/features/Records/component/RequestListItem";
import { useTrasactions } from "@/features/Records/hooks/useTransactions";
import RecordLists from "./RecordLists";
import PopupContainer from "@/components/ui/PopUpConatainer";
import { Record } from "@/features/Records/types";

export const RequestsListLimited = ({
  className,
}: {
  className?: HTMLDivElement["className"];
}) => {

  const { data: transactions = [] as Record[]} = useTrasactions({});
  const limitedRequests =  transactions.slice(0, 3);
  const [popupOpened, setPopupOpened] = useState(false);

  return (<><Block strong  inset   > 
    
    
      <List >
      <BlockTitle className="pl-4" >Last Records</BlockTitle> 
        {limitedRequests.map((request, index) => (
          <RequestsListItem key={index} request={request} />
        ))}
      </List>
       {transactions.length > 3 && (

<>
<p   onClick={() => setPopupOpened(true)} className="text-right mr-4 text-blue-600/75">
          Show More
        </p>
        <Popup
          opened={popupOpened}
          onPopupClosed={() => setPopupOpened(false)}
        >
          <Page>
            <Navbar title="Record List">
              <Link popupClose>Close</Link>
            </Navbar>
            <RecordLists transactions={transactions}/>
          </Page>
        </Popup></>
   
)}
    </Block>
 
    
    </>
  );
};
