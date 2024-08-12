import { z } from "zod";
import { ApiResponseStatus, Menu, State } from "../types/common";

export type AuthPageDataResponse = {
  status: ApiResponseStatus;
  states: State[];
  company_logo: string;
  welcome_content: string;
  privacy_policy: string;
  terms_and_conditions: string;
};

export const PrescriberRoles = [
  "RAS",
  "ACAT / ACAS",
  "Occupational Therapist",
  "Physiotherapist",
  "Speech Pathologist",
  "Optometrist",
  "Orthoptist",
] as const;

export const signupInputSchema = z.object({
  firstname: z.string().min(1, "Firstname is required"),
  lastname: z.string().min(1, "Lastname is required"),
  state: z.string().min(1, "State is required"),
  ahpra_number: z.string().optional(),
  email: z.string().email("Invalid email").min(1, "Required"),
  mobile_number: z.string().min(1, "Mobile number is required"),
  land_number: z.string().min(1, "Required"),
  organisation_name: z.string().min(1, "Organisation name is required"),
  prescriber_role: z.enum(PrescriberRoles),
  privacy_policy: z.boolean().default(false),
  terms_and_conditions: z.boolean().default(false),
});
export type SignupInput = z.infer<typeof signupInputSchema>;

export const loginInputSchema = z.object({
  username: z.string().email().min(1, "Email is required"),
  password: z.string().min(1, "Password is required"),
});
export const forgotPasswordInputSchema = z.object({
  email: z.string().email("Invalid email").min(1, "Required"),

});
export const verifyCodeInputSchema = z.object({
  email: z
    .string()
    .email("Invalid email address")
    .min(1,"Email is required"),
  code: z
    .string()
    .length(6, "Verification code must be 6 digits")
    .regex(/^\d{6}$/, "Verification code must be numeric"),
});

export const createNewPasswordInputSchema = z.object({
    password: z.string().min(1, "Required"),
});

export type LoginInput = z.infer<typeof loginInputSchema>;
export type ForgotPasswordInput =z.infer<typeof forgotPasswordInputSchema>;
export type VerifyCodeInput = z.infer<typeof verifyCodeInputSchema>;
export type CreateNewPasswordInput = z.infer<typeof createNewPasswordInputSchema>;
export type LoginResponse = {
  menu: Menu[];
  user: string;
  token: string;
  refresh_token: string;
  timezone: string;
  status: ApiResponseStatus | "ErrUser";
  message: string;
  profilepic: string;
  account_type: string;
};

export type RefreshSessionResponse = {
  status: ApiResponseStatus;
  token: string;
  user: string;
  user_id: number;
  refresh_token: string;
};

export type ValidateSessionResponse = {
  status: ApiResponseStatus | "Maintenance" | "Session is Expired or Invalid.";
  estimated_completion_time?: string;
  message_html?: string;
  user_id?: number;
  user_role?: number;
};

export type ForgotPasswordResponse = {
  status: ApiResponseStatus | "Error";
  message: string;
  result?:string;
  errorCode?:string
};

export type VerifyCodeResponse = {
  status: "Success" | "Error";
  message?: string;
  errorCode?:string;
  token: string;
};

export type CreateNewPasswordResponse = {
  status: "Success" | "Error";
  message?: string;
  errorCode?:string;
  token: string;
};

