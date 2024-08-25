
import { useAuth } from "@/features/auth/api/login";
import { useRouter } from "@/hooks/useRouter";

import { Page } from "framework7-react";
import React, { useEffect } from "react";

export type PageLayoutProps = React.ComponentPropsWithoutRef<typeof Page> & {
  requireAuth?: boolean;
};
export const PageLayout = ({
  children,
  requireAuth,
  ...props
}: PageLayoutProps) => {
  const { user } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (!user && requireAuth) {
      router.navigate("/auth/");
    }
  }, [user, requireAuth]);
  return <Page {...props}>{children}</Page>;
};
