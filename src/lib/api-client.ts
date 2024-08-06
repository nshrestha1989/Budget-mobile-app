import { useAuthStore } from "@/stores/authStore";
import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";
export type ApiError<T = unknown, d = any> = AxiosResponse<T, d>;
export type ApiV1GenericResponse<T = unknown> = {
  status: "Success" | "Error";
  version: "1.0";
  message?: string;
  data?: T;
};

declare module "@tanstack/react-query" {
  interface Register {
    defaultError: ApiError;
  }
}
declare module "axios" {
  export interface AxiosInstance {
    request<T = any>(config: AxiosRequestConfig): Promise<T>;
    get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
    delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
    head<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
    post<T = any>(
      url: string,
      data?: any,
      config?: AxiosRequestConfig,
    ): Promise<T>;
    put<T = any>(
      url: string,
      data?: any,
      config?: AxiosRequestConfig,
    ): Promise<T>;
    patch<T = any>(
      url: string,
      data?: any,
      config?: AxiosRequestConfig,
    ): Promise<T>;
  }
}
function authRequestInterceptor(config: InternalAxiosRequestConfig) {
  if (config.headers) {
    config.headers.Accept = "application/json";
  }
  const user = useAuthStore.getState().user;
  if (user?.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }

  return config;
}

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-type": "application/json",
  },
});

api.interceptors.request.use(authRequestInterceptor);
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    // TODO: notifications on error
    return Promise.reject(error.response);
  },
);

export { api };
