import { cn } from "@/lib/utils";
import { YesNoOptions } from "@/types/common";
import { Button, Icon, Input, ListInput, ListItem ,f7} from "framework7-react";
import React, { useEffect, useState,useRef } from "react";
import {
  Control,
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
  FormProvider,
  UseControllerProps,
  useFormContext,
  useFormState,
  useWatch,
} from "react-hook-form";
import Keypad from "./Keypad";


import "../../../node_modules/framework7/framework7-bundle.min.css"; // Assuming custom styles or from a package

import "../../../node_modules/framework7-plugin-keypad/framework7-keypad.min.css"; // Assuming custom styles or from a package

const Form = FormProvider;

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
};

const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue,
);

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
};

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext);
  const { getFieldState, formState } = useFormContext();

  const fieldState = getFieldState(fieldContext.name, formState);

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>");
  }

  return {
    name: fieldContext.name,
    ...fieldState,
  };
};

export type ValueAsType = "number" | "boolean"|"numpad";
const coerceValue = (type: ValueAsType, value: any) => {
  if (type === "number") {
    // Allow string to pass through if it's an incomplete decimal input (e.g., "3.")
    if (value === "" || value === "-" || value.endsWith(".")) {
      return value;  // Keep as string until a valid number
    }
    
    let temp = parseFloat(value);
    return isNaN(temp) ? "" : temp;  // Return empty string for invalid number
  }

  if (type === "boolean") {
    return typeof value === "string"
      ? value.toLowerCase() === "true"
      : Boolean(value);
  }
};


const FormListInputField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  control,
  name,
  valueAs,
  ...props
}: UseControllerProps<TFieldValues, TName> &
  React.ComponentPropsWithoutRef<typeof ListInput> & {
    valueAs?: ValueAsType;
    prefix?: React.ReactNode;
  }) => {
  const isFile = props.type === "file";
  const isDatePicker = props.type === "datepicker";
  const isCalculator =  props.type === "calculator";
  const isNumpad  =  props.type === "numpad";
  const numpadRef = useRef<any>(null);
  const handleOpenKeypad = () => {
    let  numpad = (f7 as any).keypad.create({
       inputEl: numpadRef.current,
       valueMaxLength: 2,
        dotButton: false,
        openIn:"auto",
        backdrop:false,
        type:"calculator",
        inline:true,
        toolbar:false
   
     });
 
     numpad.open();
   };
  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        const { error } = fieldState;
        const value =
          isDatePicker && field.value ? [field.value] : field.value || "";
        return (
          <ListInput
            {...props}
            disabled={field.disabled}
            errorMessageForce={!!error}
            errorMessage={error?.message ? String(error?.message) : ""}
            input={false}
          >
            <div slot="input" className="flex items-center">
              {!!props.prefix && !isFile && (
                <div className="mr-2">{props.prefix}</div>
              )}
              <Input
              
                {...props}
                type={props.type || "text"}
                ref={numpadRef}
                calendarParams={
                  isDatePicker
                    ? {
                        openIn: "customModal",
                        header: true,
                        footer: true,
                        closeOnSelect: true,
                        ...props.calendarParams,
                      }
                    : undefined
                }

                value={value}
                disabled={field.disabled}
                className={cn(
                  "w-full [--f7-input-border-color:none] [--f7-input-focused-border-color:none]",
                )}
                onCalendarChange={(e) => {
                  if (!e?.[0]) {
                    return field.onChange(null);
                  } else if (e[0] instanceof Date) {
                    const date = e[0];
                    const dateFormatted =
                      date.getFullYear() +
                      "-" +
                      (date.getMonth() + 1).toString().padStart(2, "0") +
                      "-" +
                      date.getDate().toString().padStart(2, "0");
                    field.onChange(dateFormatted);
                  }
                }}
                onInput={()=>{
                  if(isCalculator){
                   
                   handleOpenKeypad()}
                  
               }}
                onChange={(e) => {
                  let value = e.target.value;
                  if (valueAs && !isFile) {
                    value = coerceValue(valueAs, value);
                  }
                  field.onChange(value);
                }}
                onBlur={field.onBlur}
                name={field.name}
              />
            
           
              {isDatePicker && (
                <Icon
                  ios="material:calendar_month"
                  md="material:calendar_month"
                  className="text-muted"
                />
              )}
            </div>
            {props.children}
          </ListInput>
        );
      }}
    ></FormField>
  );
};

FormListInputField.displayName = "f7-list-item";

const FormListFileUploadField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  control,
  name,
  buttonLabel = "Upload",
  className,
  children,
  accept,
  ...props
}: UseControllerProps<TFieldValues, TName> &
  React.ComponentPropsWithoutRef<typeof ListInput> & {
    buttonLabel?: string;
    accept?: string;
  }) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        const [filename, setFilename] = useState("");
        useEffect(() => {
          const value = field.value as FileList;
          if (!value) {
            setFilename("");
            return;
          }
          let filenames = [];
          for (let index = 0; index < value.length; index++) {
            const file = value[index];
            filenames.push(file.name);
          }
          setFilename(filenames.join(", "));
        }, [field.value]);
        const { error } = fieldState;
        return (
          <ListInput
            {...props}
            type="file"
            disabled={field.disabled}
            errorMessageForce={!!error}
            errorMessage={error?.message ? String(error?.message) : ""}
            input={false}
            className="[--f7-input-border-color:none] [&_.item-input-error-message]:mt-0"
          >
            <div slot="input" className="flex items-center">
              <label
                className={cn(
                  "button button-tonal mt-2 flex h-[auto] items-center gap-2 text-wrap py-1",
                  className,
                )}
              >
                <div
                  className=""
                  onClick={(e) => {
                    if (filename) {
                      e.preventDefault();
                      field.onChange(null);
                    }
                  }}
                >
                  {filename ? (
                    <Icon ios="f7:xmark" md="f7:xmark" size={20} />
                  ) : (
                    <Icon
                      ios="f7:square_arrow_up"
                      md="f7:square_arrow_up"
                      size={20}
                    />
                  )}
                </div>
                <div className="break-all">
                  {filename ? (
                    filename
                  ) : (
                    <>{children ? children : buttonLabel}</>
                  )}
                </div>

                <input
                  type={"file"}
                  // value={field.value || ""}
                  accept={accept}
                  disabled={field.disabled}
                  className={cn("hidden")}
                  onChange={(e) => {
                    let value = e.target.files as FileList;
                    field.onChange(value);
                    field.onBlur();
                  }}
                  onBlur={field.onBlur}
                  name={field.name}
                />
              </label>
            </div>
          </ListInput>
        );
      }}
    ></FormField>
  );
};
FormListFileUploadField.displayName = "f7-list-item";

const FormListItemCheckboxField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  control,
  name,
  ...props
}: UseControllerProps<TFieldValues, TName> &
  React.ComponentPropsWithoutRef<typeof ListItem>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        const { error } = fieldState;
        return (
          <ListItem
            {...props}
            checkbox
            checked={field.value === true}
            onChange={field.onChange}
            name={field.name}
            className={cn(
              "[--f7-list-item-title-white-space:wrap]",
              props.className,
            )}
          >
            <div slot="">{props.children}</div>
            {error && (
              <div
                slot="root"
                className="item-content !min-h-[auto] pb-2 text-xs text-error"
              >
                {String(error.message)}
              </div>
            )}
          </ListItem>
        );
      }}
    ></FormField>
  );
};
FormListItemCheckboxField.displayName = "f7-list-item";

const FormListItemRadioField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  control,
  name,
  preventError,
  valueAs,
  ...props
}: UseControllerProps<TFieldValues, TName> &
  React.ComponentPropsWithoutRef<typeof ListItem> & {
    preventError?: boolean;
    valueAs?: ValueAsType;
  }) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        const { error } = fieldState;
        return (
          <ListItem
            {...props}
            radio
            radioIcon="start"
            onChange={(e) => {
              let value = e.target.value;
              if (valueAs) {
                value = coerceValue(valueAs, value);
              }
              field.onChange(value);
              props.onChange?.(value);
            }}
            name={field.name}
            className={cn("", props.className)}
          >
            {props.children}
            {error && !preventError && (
              <div slot="footer" className="text-error">
                {String(error.message)}
              </div>
            )}
          </ListItem>
        );
      }}
    ></FormField>
  );
};
FormListItemRadioField.displayName = "f7-list-item";

const FormListItemRadioGroupField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  control,
  name,
  label,
  options,
  ...props
}: UseControllerProps<TFieldValues, TName> &
  React.ComponentPropsWithoutRef<typeof ListItem> & {
    label?: string;
    valueAs?: ValueAsType;
    options:
      | readonly (string | number)[]
      | (string | number)[]
      | Record<string | number, any>;
  }) => {
  const formState = useFormState({
    control,
  });
  const error = name
    .split(".")
    .reduce((o, i) => o?.[i] as any, formState?.errors || {});
  const watch = useWatch({
    control,
    name,
  });
  const isOptionsArray = Array.isArray(options);
  const displayOptions = isOptionsArray ? options : Object.keys(options);
  return (
    <>
      {!!label && (
        <div className="item-content item-title item-label ">{label}</div>
      )}
      {displayOptions.map((option, index) => {
        const value = isOptionsArray ? option : options[option];
        return (
          <FormListItemRadioField
            {...props}
            control={control}
            name={name}
            checked={value === watch}
            value={value}
            key={index}
            preventError
            className="[--f7-list-item-border-color:none]"
          >
            {option}
          </FormListItemRadioField>
        );
      })}
      {error && (
        <div className="item-content !min-h-[auto] pb-2 text-xs text-error">
          {String(error.message)}
        </div>
      )}
    </>
  );
};
FormListItemRadioGroupField.displayName = "f7-list-item";

export {
  useFormField,
  Form,
  FormListInputField,
  FormListItemCheckboxField,
  FormListItemRadioField,
  FormListItemRadioGroupField,
  FormField,
  FormListFileUploadField,
};
