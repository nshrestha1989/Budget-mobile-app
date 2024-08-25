import { cn } from "@/lib/utils";
import { List as ListF7 } from "framework7-react";
import { ListProps } from "framework7-react/components/list";

function List({ className, ...props }: ListProps) {
  return (
    <ListF7
      strongIos
      outlineIos
      dividersIos
      strongMd
      insetMd
      {...props}
      className={cn(className)}
    />
  );
}

export { List };
