
import { Badge, ListItem } from "framework7-react";
import { Record } from "../types";
import { cn, formatDate } from "@/lib/utils";
import { Account } from "@/features/account/type";


export const AccountListItem = ({
  account,
  className,
}: {
  account: Account ;
  className?: HTMLDivElement["className"];
}) => {

  return (
    <ListItem link={`/account/${account.$id}/edit/`} className={cn(className)}

    >
      
      <div>
      <div className="text-muted">
          <div>{account.AccountName}</div>
        </div>
        <div className="font-medium text-primary">
          {account.AccountType} 
        </div>
        <div className="text-muted">
          <div>Description: {account.InitialBalance}</div>
        </div>
      
      </div>
    </ListItem>
  );
};
AccountListItem.displayName = "f7-list-item";
