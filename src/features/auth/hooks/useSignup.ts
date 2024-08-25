import { useMutation } from "@tanstack/react-query";
import { UseSignupOptions } from "../types";
import { signup } from "../api/signup";

export const useSignup = ({ mutationConfig }: UseSignupOptions) => {
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: signup,
  });
};
