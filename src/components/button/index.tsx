"use client";

import { ComponentPropsWithoutRef } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  variant?: "primary" | "outlined" | "danger";
}

function Button({ className, variant = "primary", ...props }: ButtonProps) {
  const variantClasses = {
    primary: "bg-purple-600 text-white hover:bg-purple-500",
    outlined:
      "bg-transparent border-2 border-purple-600 text-purple-600 hover:border-purple-500",
    danger:
      "text-red-500 border-red-500 border hover:bg-red-600 bg-transparent hover:text-white",
  };

  const _className = twMerge(
    variantClasses[variant],
    "appearance-none h-12 cursor-pointer rounded-lg p-2 text-sm font-medium shadow transition-all",
    className
  );

  return (
    <button className={_className} {...props}>
      {props.children}
    </button>
  );
}

export default Button;
