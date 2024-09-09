
import { Badge, ListItem } from "framework7-react";
import { Transaction } from "../types";
import { cn, formatDate } from "@/lib/utils";

const requestStatusColorMapping = (status: any) => {
  switch (status) {
    case "Cancelled":
      return "red";
    case "Draft":
      return "yellow";
    case "Processed":
      return "Teal";
    case "Submitted":
      return "lightblue";
    default:
      return "red";
  }
};

export const RequestsListItem = ({
  request,
  className,
}: {
  request: Transaction ;
  className?: HTMLDivElement["className"];
}) => {
  return (
    <ListItem link={`/request/${request.transactionId}/`} className={cn(className)}>
      <div>
        <div className="font-medium text-primary">
          {request.description} 
        </div>
        <div className="text-muted">
          <div>
            Transaction ID: {request.transactionId}{" "}

          </div>
          <div>Amount: {request.amount}</div>
          <div>Transaction Date: {formatDate(request.transactionDate)}</div>
          <div>Is Income : {request.isIncome}</div>
        </div>
      </div>
      <div>
        <Badge bgColor={requestStatusColorMapping(request.isIncome)}>
          {request.isIncome?"true":"false"}
        </Badge>
      </div>
    </ListItem>
  );
};
RequestsListItem.displayName = "f7-list-item";
