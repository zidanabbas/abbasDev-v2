import React, { MouseEventHandler, ReactNode } from "react";
import Link from "next/link";

interface ButtonProps {
  href?: string;
  variant?: string;
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit" | "reset";
}

export default function Button({
  onClick,
  href,
  children,
  variant,
  type,
}: ButtonProps) {
  return href ? (
    <Link
      href={href}
      className={`max-w-fit block py-2 px-4 bg-neutral-600 hover:bg-neutral-700 text-neutral-200 rounded-lg ${variant} `}
    >
      {children}
    </Link>
  ) : (
    <button
      onClick={onClick}
      className={`block py-2 px-4 bg-neutral-600 hover:bg-neutral-700 text-neutral-200 rounded-lg ${variant} `}
      type={type ?? "button"}
    >
      {children}
    </button>
  );
}
