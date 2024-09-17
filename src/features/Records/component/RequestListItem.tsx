
import { Badge, ListItem } from "framework7-react";
import { Record } from "../types";
import { cn, formatDate } from "@/lib/utils";

const requestStatusColorMapping = (status: boolean) => {
  switch (status) {
    case true:
      return "green";
    default:
      return "red";
  }
};

export const RequestsListItem = ({
  request,
  className,
}: {
  request: Record ;
  className?: HTMLDivElement["className"];
}) => {
  return (
    <ListItem link={`/records/${request.transactionId}/edit/`} className={cn(className)}>
      <div>
        <div className="font-medium text-primary">
          {request.categories?.categoryname} 
        </div>
        <div className="text-muted">
          <div>Description: {request.description}</div>
        </div>
        <div className="text-muted">
          <div>Date: {formatDate(request.transactionDate)}</div>
        </div>
      </div>
      <div>
        <Badge bgColor={requestStatusColorMapping(request.isIncome)}>
        <div>{request.amount}</div>
        </Badge>
      </div>
    </ListItem>
  );
};
RequestsListItem.displayName = "f7-list-item";
