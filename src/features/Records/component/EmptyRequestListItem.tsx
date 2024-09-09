import { cn } from "@/lib/utils";
import { ListItem } from "framework7-react";

export const EmptyRequestsListItem = ({
  className,
}: {
  className?: HTMLDivElement["className"];
}) => {
  return (
    <ListItem
      link={"#"}
      className={cn("skeleton-text skeleton-effect-wave", className)}
    >
      <div>
        <div className="text-primary font-medium">
          Lorem ipsum dolor sit amet,
        </div>
        <div className="text-muted">
          <div>Lorem ipsum dolor </div>
          <div>Lorem ipsum dolor sit</div>
          <div>Lorem ipsum </div>
        </div>
      </div>
    </ListItem>
  );
};
EmptyRequestsListItem.displayName = "f7-list-item";
