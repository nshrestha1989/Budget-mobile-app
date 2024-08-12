import { f7 } from "framework7-react";

export const useRouter = () => {
  try {
    const currentRouter = f7.view.current;
    if (currentRouter?.router) {
      return currentRouter?.router;
    }
  } catch (error) {}
  return f7.view.main.router;
};
