import { LoginResponse } from "../types/auth";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

type AuthState = {
  user: LoginResponse | null;
  isAuthenticated: boolean | null;
  loginErrorMessage?: string | null;
  forgotPasswordMessage?: string | null;
  forgotPasswordErrorMessage?: string | null;
  verifyCodeErrorMessage?: string | null;
  token: string;
  createNewPasswordErrorMessage?: string | null;
};

type AuthActions = {
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  setLoginError: (error?: string) => void;
  setUserData: (user: LoginResponse) => void;
  setForgotPasswordMessage: (message?: string) => void;
  setForgotPasswordErrorMessage: (message?: string) => void;
  setVerifyCodeErrorMessage: (error?: string) => void;
  setToken: (token: string) => void;
  setCreateNewPasswordErrorMessage: (error?: string) => void;

};

export const useAuthStore = create<AuthState & AuthActions>()(
  devtools(
    persist(
      (set, get) => ({
        user: null,
        isReady: false,
        isAuthenticated: null,
        forgotPasswordMessage: null,
        forgotPasswordErrorMessage: null,
        verifyCodeErrorMessage: null,
        token: "",
        setUserData(user) {
          set({
            user: user,
            loginErrorMessage: null,
            isAuthenticated: true,
          });
        },
        setIsAuthenticated(isAuthenticated) {
          set({ isAuthenticated });
          if (!isAuthenticated) {
            set({ user: null });
          }
        },
        setLoginError(error) {
          set({
            loginErrorMessage: error || null,
          });
        },
        setForgotPasswordMessage(message) {
          set({
            forgotPasswordMessage: message || null,
          });
        },
        setForgotPasswordErrorMessage(message) {
          set({
            forgotPasswordErrorMessage: message || null,
          });
        },
        setVerifyCodeErrorMessage(error) {
          set({
            verifyCodeErrorMessage: error || null,
          });
        },
        setToken(token) {
          set({ token });
        },
        setCreateNewPasswordErrorMessage: (error) => set({ createNewPasswordErrorMessage: error }),

      }),
      {
        name: "authStore",
        partialize: (state) => ({ user: state.user, token: state.token }),
      },
    ),
  ),
);
