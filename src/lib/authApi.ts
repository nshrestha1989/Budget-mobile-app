import { ApiError, api } from "./api-client";
import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "@/stores/authStore";
import { useEffect } from "react";
import { useRouter } from "../hooks/useRouter";
import {
  CreateNewPasswordInput,
  CreateNewPasswordResponse,
  ForgotPasswordInput,
  ForgotPasswordResponse,
  LoginInput,
  LoginResponse,
  RefreshSessionResponse,
  ValidateSessionResponse,
  VerifyCodeInput,
  VerifyCodeResponse,
} from "../types/auth";

const loginWithEmailPassword = async (
  input: LoginInput,
): Promise<LoginResponse> => {
  return await api.post("/auth/signin", input);
};

const refreshSession = async (
  refresh_token: string,
): Promise<RefreshSessionResponse> => {
  return await api.post("/auth/RefreshToken", {
    refresh_token,
  });
};

const validateSession = async (): Promise<ValidateSessionResponse> => {
  const now = new Date();
  return await api.post("/auth/validateSession", {
    currDate: now,
  });
};

const forgotPasswordWithEmail = async (
  input: ForgotPasswordInput,
): Promise<ForgotPasswordResponse> => {
  return await api.post("/auth/forgot", input);
};

const verifyCodeFromEmail = async (
  input: VerifyCodeInput,
): Promise<VerifyCodeResponse> => {
  return await api.post("/auth/validate", input);
};

const createPassword = async (
  input: CreateNewPasswordInput,
  token: string,
): Promise<CreateNewPasswordResponse> => {
  return await api.post("/auth/resetPassword", { ...input, token });
};

let _hasValidated = false;
export const useAuth = () => {
  const router = useRouter();
  const {
    user,
    loginErrorMessage,

    forgotPasswordErrorMessage,
    verifyCodeErrorMessage,
    createNewPasswordErrorMessage,
    token,
    setIsAuthenticated,
    setLoginError,
    setUserData,

    setForgotPasswordErrorMessage,
    setVerifyCodeErrorMessage,
    setCreateNewPasswordErrorMessage,
    setToken,
  } = useAuthStore();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  useEffect(() => {
    if (isAuthenticated === null && !_hasValidated) {
      _hasValidated = true;
      validate.mutate();
    }
  }, [isAuthenticated]);
  const refresh = useMutation({
    mutationFn: refreshSession,
    onSuccess: (data) => {
      if (data.status === "Success") {
        const { status, ...newUserData } = data;
        setUserData({ ...user!, ...newUserData });
      } else {
        setIsAuthenticated(false);
      }
    },
    onError: (error: ApiError<ValidateSessionResponse>) => {
      setIsAuthenticated(false);
    },
  });
  const validate = useMutation({
    mutationFn: validateSession,
    onSuccess: (data) => {
      if (data.status === "Success") {
        setIsAuthenticated(true);
      } else {
        if (user?.refresh_token) {
          refresh.mutate(user.refresh_token);
        } else {
          setIsAuthenticated(false);
          router.navigate("/auth/");
        }
      }
    },
    onError: (error: ApiError<ValidateSessionResponse>) => {
      setIsAuthenticated(false);
    },
  });
  const login = useMutation({
    mutationFn: loginWithEmailPassword,
    onMutate: () => {
      setLoginError(undefined);
    },
    onSuccess: (data) => {
      login;
      if (data.status === "Success") {
        setUserData(data);
      } else {
        setLoginError(data.message);
      }
    },
    onError: (error: ApiError<LoginResponse>) => {
      setLoginError(
        error?.data.message || "Could not sign in. Please try again",
      );
    },
  });

  const forgotPassword = useMutation({
    mutationFn: forgotPasswordWithEmail,
    onMutate: () => {
      setForgotPasswordErrorMessage("");
    },
    onSuccess: (data) => {
      if (data.status === "Success") {
      } else {
        setForgotPasswordErrorMessage(data.message);
      }
    },
    onError: (error: ApiError<ForgotPasswordResponse>) => {
      setForgotPasswordErrorMessage(
        error?.data.message ||
          "Could not send password reset email. Please try again",
      );
    },
  });
  const verifyCode = useMutation({
    mutationFn: verifyCodeFromEmail,
    onMutate: () => {
      setVerifyCodeErrorMessage("");
    },
    onSuccess: (data) => {
      if (data.status === "Success") {
        setToken(data.token);
      } else {
        setVerifyCodeErrorMessage(data.message);
      }
    },
    onError: (error: ApiError<VerifyCodeResponse>) => {
      setVerifyCodeErrorMessage(
        error?.data.message || "Could not verify code. Please try again",
      );
    },
  });

  const createNewPassword = useMutation({
    mutationFn: (values: CreateNewPasswordInput) =>
      createPassword(values, token),
    onMutate: () => {
      setVerifyCodeErrorMessage("");
    },
    onSuccess: (data) => {
      if (data.status === "Success") {
        // setVerifyCodeMessage("Verification successful.");
      } else {
        setCreateNewPasswordErrorMessage(data.message);
      }
    },
    onError: (error: ApiError<CreateNewPasswordResponse>) => {
      setCreateNewPasswordErrorMessage(
        error?.data.message ||
          "Could not create new password. Please try again",
      );
    },
  });
  const logout = useMutation({
    mutationFn: async () => {
      setIsAuthenticated(false);
    },
  });
  return {
    isAuthenticated,
    user,
    login,
    logout,
    loginErrorMessage,

    forgotPassword,
    forgotPasswordErrorMessage,
    verifyCode,
    verifyCodeErrorMessage,
    createNewPassword,
    createNewPasswordErrorMessage,
  };
};
