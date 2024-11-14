import { LoginResponse } from "../../../types/auth";
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
  sessionId: string; // Add sessionId to your state
  createNewPasswordErrorMessage?: string | null;
};

type AuthActions = {
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  setLoginError: (LoginError: string) => void;
  setUserData: (user: LoginResponse | null) => void;
  setForgotPasswordMessage: (message?: string) => void;
  setForgotPasswordErrorMessage: (message?: string) => void;
  setVerifyCodeErrorMessage: (error?: string) => void;
  setToken: (token: string) => void;
  setSessionId: (sessionId: string) => void; // Add action for sessionId
  setCreateNewPasswordErrorMessage: (error?: string) => void;
};

export const useAuthStore = create<AuthState & AuthActions>()(
  devtools(
    persist(
      (set, get) => ({
        user: null,
        isAuthenticated: null,
        forgotPasswordMessage: null,
        forgotPasswordErrorMessage: null,
        verifyCodeErrorMessage: null,
        token: "",
        sessionId: "", // Initialize sessionId
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
            set({ user: null, sessionId: "", token: "" }); // Clear sessionId and token on logout
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
        setSessionId(sessionId) {
          set({ sessionId });
        },
        setCreateNewPasswordErrorMessage: (error) => set({ createNewPasswordErrorMessage: error }),
      }),
      {
        name: "authStore",
        partialize: (state) => ({ user: state.user, token: state.token, sessionId: state.sessionId }),
      },
    ),
  ),
);
