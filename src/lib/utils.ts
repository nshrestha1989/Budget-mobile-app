import { twMerge } from "tailwind-merge";
import { type ClassValue, clsx } from "clsx";
import { z } from "zod";
import dayjs from "dayjs";
import React from "react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}


export const zodAlwaysRefine = <T extends z.ZodTypeAny>(zodType: T) => {
  return z.any().superRefine(async (value, ctx) => {
    const res = await zodType.safeParseAsync(value);

    if (res.success === false)
      for (const issue of res.error.issues) {
        ctx.addIssue(issue);
      }
  }) as unknown as T;
};

export const formatDateTime = (date?: string | Date | null) => {
  const d = dayjs(date);
  return date && d.isValid() ? d.format("DD MMM YYYY HH:mm A") : "";
};
export const formatDate = (date?: string | Date | null) => {
  const d = dayjs(date);
  return date && d.isValid() ? d.format("DD MMM YYYY ") : "";
};

export function genericsWithForwardRef<T, P = {}>(
  render: (props: P, ref: React.Ref<T>) => React.ReactNode,
): (props: P & React.RefAttributes<T>) => React.ReactNode {
  return React.forwardRef(render) as any;
}
