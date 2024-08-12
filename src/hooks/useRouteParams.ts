import { useEffect, useState } from "react";
import { useRouter } from "./useRouter";
import { f7 } from "framework7-react";

export const useRouteParams = () => {
  const [params, setParams] = useState<Record<string, string | undefined>>({});
  useEffect(() => {
    setTimeout(() => {
      try {
        setParams(f7.view.current.router.currentRoute.params || {});
      } catch (e) {
        setParams({});
      }
    }, 1);
  }, []);

  return params;
};
