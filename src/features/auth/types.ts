import { MutationConfig } from "@/lib/react-query";
import { signup } from "./api/signup";

export type UseSignupOptions = {
    mutationConfig?: MutationConfig<typeof signup>;
  };