"use client";

import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";
import _DatePicker, { registerLocale } from "react-datepicker";
import { ptBR } from "date-fns/locale/pt-BR";

import "react-datepicker/dist/react-datepicker.css";

registerLocale("pt-BR", ptBR);

interface InputProps {
  error?: boolean;
  errorMessage?: string;
  className?: string | undefined;
  placeholder?: string;
}

function DatePicker({
  className,
  placeholder,
  error,
  errorMessage,
  ...props
}: InputProps) {
  const datePickerClassName = twMerge(
    "w-full rounded-lg border border-gray-300 bg-white p-2 text-sm font-normal text-primaryDarker placeholder-black placeholder-opacity-20 outline-none transition-all focus:ring-1 focus:ring-primary",
    error ? "border-red-500" : "",
    className
  );

  return (
    <div className="flex w-full flex-col">
      <_DatePicker
        dateFormat="dd/MM/yyyy"
        locale="pt-BR"
        wrapperClassName="w-full"
        className={datePickerClassName}
        enableTabLoop={false}
        placeholderText={placeholder}
        {...props}
      />
      {error && errorMessage && (
        <div className="text-red-500 mt-1 text-xs">{errorMessage}</div>
      )}
    </div>
  );
}

export default forwardRef(DatePicker);
