
import { Badge, ListItem } from "framework7-react";
import { Record } from "../types";
import { cn, formatDate } from "@/lib/utils";


export const RequestsListItem = ({
  request,
  className,
}: {
  request: Record ;
  className?: HTMLDivElement["className"];
}) => {

  return (
    <ListItem link={`/records/${request.transactionId}/edit/`} className={cn(className)}

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
        <div className={request.isIncome ?"text-green-600/100":"text-red-600/100"}>
        <div>{!request.isIncome &&"-"}{request.amount}</div>
        </div>
      </div>
    </ListItem>
  );
};
RequestsListItem.displayName = "f7-list-item";
