export type State = {
  id: string;
  text: string;
};

export type ApiResponseStatus = "Success" | "Error";

export const ApiSort = ["Asc", "Desc"] as const;

export type Menu = {
  id: number;
  menu_name: string;
  menu_icon: string;
  menu_link: string;
  menu_parent_id: number;
  order: number;
  status: boolean;
  created: string;
  created_by: number;
  updated: string;
  updated_by: number;
};

export const YesNoOptions = ["Yes", "No"] as const;
export const YesNoAsIntOptions = {
  Yes: 1,
  No: 0,
} as const;
export const YesNoAsBooleanOptions = {
  Yes: true,
  No: false,
} as const;
export type YesNoOption = (typeof YesNoOptions)[number];
