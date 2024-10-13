import { useState } from "react";
import { List, ListItem, Button, Block, BlockTitle } from "framework7-react";

import { useRouter } from "@/hooks/useRouter";
import { RequestsListItem } from "@/features/Records/component/RequestListItem";
import { useTrasactions } from "@/features/Records/hooks/useTransactions";

export const RequestsListLimited = ({
  className,
}: {
  className?: HTMLDivElement["className"];
}) => {
  const [showMore, setShowMore] = useState(false);
  const router = useRouter();
  const { data: transactions = [], isPending } = useTrasactions({});
  const limitedRequests = showMore ? transactions : transactions.slice(0, 3);

  const handleShowMore = () => {
    router.navigate("/records/list/");
  };


 
  return (<Block strong  inset   > 
    
    
      <List >
      <BlockTitle className="pl-4" >Last Records</BlockTitle> 
        {limitedRequests.map((request, index) => (
          <RequestsListItem key={index} request={request} />
        ))}
      </List>

      {/* Show "Show More" button if there are more than 3 requests */}
      {transactions.length > 3 && (
        <p  onClick={handleShowMore} className="text-right mr-4 text-blue-600/75">
          Show More
        </p>
      )}
    
    </Block>
  );
};
