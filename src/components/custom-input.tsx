"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";

import React from "react";
import Image from "next/image";
import { Input } from "./ui/input";
import DatePicker from "react-datepicker";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import "react-datepicker/dist/react-datepicker.css";
import { Control, ControllerRenderProps } from "react-hook-form";

//-------------------------------------------------------------------------------

export enum FormFieldType {
  INPUT = "input",
  TEXTAREA = "textarea",
  PHONE_INPUT = "phoneInput",
  CHECKBOX = "checkbox",
  DATE_PICKER = "datePicker",
  SELECT = "select",
  SKELETON = "skeleton",
  MULTI_SELECT = "multiSelect",
}

interface TCustomFormFieldProps<T> {
  control: Control<any>;
  fieldType: FormFieldType;
  name: string;
  label?: string;
  placeholder?: string;
  iconSrc?: string;
  iconAlt?: string;
  disabled?: boolean;
  dateFormat?: string;
  showTimeSelect?: boolean;
  options?: { label: string; value: T }[] | null;
  children?: React.ReactNode;
  renderSkeleton?: (
    field: ControllerRenderProps<any, string>,
  ) => React.ReactNode;
}

//-------------------------------------------------------------------------------

const RenderField = <T,>({
  field,
  props,
}: {
  field: any;
  props: TCustomFormFieldProps<T>;
}) => {
  switch (props.fieldType) {
    case FormFieldType.INPUT:
      return (
        <div className="border-dark-500 bg-dark-400 flex items-center rounded-md border">
          {props.iconSrc && (
            <Image
              width={24}
              height={24}
              src={props.iconSrc}
              alt={props.iconAlt || "icon"}
              className="ml-2 h-6"
            />
          )}

          <FormControl>
            <Input
              placeholder={props.placeholder}
              {...field}
              className="shad-input border-0"
            />
          </FormControl>
        </div>
      );
    case FormFieldType.TEXTAREA:
      return (
        <FormControl>
          <Textarea
            placeholder={props.placeholder}
            {...field}
            className="shad-textArea"
            disabled={props.disabled}
          />
        </FormControl>
      );

    case FormFieldType.PHONE_INPUT:
      return (
        <FormControl>
          <PhoneInput
            defaultCountry="IN"
            placeholder={props.placeholder}
            international
            withCountryCallingCode
            value={field.value}
            onChange={field.onChange}
            className="input-phone"
          />
        </FormControl>
      );
    case FormFieldType.DATE_PICKER:
      return (
        <div className="border-dark-500 bg-dark-400 flex items-center rounded-md border">
          <Image
            width={24}
            height={24}
            src="/assets/icons/calendar.svg"
            alt="calendar"
            className="ml-2 h-6"
          />

          <FormControl>
            <DatePicker
              selected={field.value}
              onChange={(date) => {
                field.onChange(date);
              }}
              dateFormat={props.dateFormat ?? "MM/dd/yyyy"}
              showTimeSelect={props.showTimeSelect ?? false}
              timeInputLabel="Time:"
              wrapperClassName="date-picker"
            />
          </FormControl>
        </div>
      );
    case FormFieldType.SKELETON:
      return props.renderSkeleton ? props.renderSkeleton(field) : null;

    case FormFieldType.CHECKBOX:
      return (
        <div className="flex items-center gap-4">
          <Checkbox
            id={props.name}
            checked={field.value}
            onCheckedChange={field.onChange}
          />
          <label htmlFor={props.name} className="checkbox-label">
            {" "}
            {props.label}
          </label>
        </div>
      );

    case FormFieldType.SELECT:
      return (
        <FormControl>
          <Select defaultValue={field.value} onValueChange={field.onChange}>
            <FormControl>
              <SelectTrigger className="shad-select-trigger">
                <SelectValue placeholder={props.placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="shad-select-content">
              {props.children}
            </SelectContent>
          </Select>
        </FormControl>
      );

    case FormFieldType.MULTI_SELECT:
      const options = props.options;

      const selectedOptions = options
        ?.filter((option) => field.value.includes(option.value))
        .map((option) => option.label);

      return (
        <Select>
          <SelectTrigger className="h-[42px]">
            {field.value && field.value.length > 0
              ? selectedOptions?.join(", ")
              : props.placeholder || "Select options..."}
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {options?.map((option, idx) => {
                return (
                  <div
                    className="relative flex w-full cursor-pointer select-none items-center gap-1.5 rounded-sm py-2 pl-2 pr-2 text-sm outline-none hover:bg-ceramic focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                    onClick={() => {
                      if (field.value.includes(option.value)) {
                        field.onChange(
                          field.value.filter(
                            (item: unknown) => item !== option.value,
                          ),
                        );
                      } else {
                        field.onChange([...field.value, option.value]);
                      }
                    }}
                    key={idx}
                  >
                    <Checkbox checked={field.value.includes(option.value)} />
                    {option.label}
                  </div>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
      );

    default:
      break;
  }
};

//-------------------------------------------------------------------------------

const CustomInputField = <T,>(props: TCustomFormFieldProps<T>) => {
  const { control, fieldType, name, label } = props;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex-1">
          {fieldType !== FormFieldType.CHECKBOX && label && (
            <FormLabel className="text-[15px] text-black/80">{label}</FormLabel>
          )}

          <RenderField<T> field={field} props={props} />

          <FormMessage className="shad-error" />
        </FormItem>
      )}
    />
  );
};

export default CustomInputField;
