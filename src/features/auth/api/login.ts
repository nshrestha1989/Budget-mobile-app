import { useMutation } from "@tanstack/react-query";

import {
  LoginInput,
} from "../../../types/auth";
import { createAdminClient } from "../../../lib/API/appwrite/appwrite";
import { Account } from "appwrite";
import { useAuthStore } from "../hooks/authStore";


const account = new Account(createAdminClient);
const loginWithEmailPassword = async (
  input: LoginInput,
): Promise<any> => {
  return await  account.createEmailPasswordSession(input.username, input.password);
};

export const useAuth = () => {
  const {
    user,
    loginErrorMessage,
    forgotPasswordErrorMessage,
    verifyCodeErrorMessage,
    createNewPasswordErrorMessage,
    setIsAuthenticated,
    setLoginError,
    setUserData,
    setSessionId,
  } = useAuthStore();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const login = useMutation({
    mutationFn: loginWithEmailPassword,
    onMutate: () => {
      setLoginError("Error");
    },
    onSuccess: (data) => {
      login;
      if (data.$id) {
        setUserData(data);
        setIsAuthenticated(true);
        setSessionId(data.$id);
      } else {
        setLoginError("Error");
      }
    },
    onError: () => {
      setLoginError(
       "Could not sign in. Please try again",
      );
    },
  });


  const logout = useMutation({
    mutationFn: async () => {
      setUserData(null);
      setIsAuthenticated(false);
       setSessionId("");
      await account.deleteSession('current');
      
    },
  });
  return {
    isAuthenticated,
    user,
    login,
    logout,
    loginErrorMessage,
    forgotPasswordErrorMessage,
    verifyCodeErrorMessage,
    createNewPasswordErrorMessage,
  };
};
