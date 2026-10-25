"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { track, type AnalyticsEvent } from "@/lib/analytics";
import { cn } from "@/lib/cn";

type Props = {
  children: ReactNode;
  variant?: "solid" | "line";
  surface?: "light" | "dark";
  className?: string;
  event?: AnalyticsEvent;
  href?: string;
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
  target?: string;
  rel?: string;
};

export function Button({
  children,
  variant = "solid",
  surface = "light",
  className,
  event,
  href,
  type = "button",
  onClick,
  disabled,
  target,
  rel,
}: Props) {
  const classes = cn(
    "inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 text-base font-medium",
    variant === "solid" && "bg-hoja text-white",
    variant === "line" && surface === "light" && "border border-hoja text-savia",
    variant === "line" && surface === "dark" && "border border-avena text-avena",
    disabled && "pointer-events-none opacity-50",
    className,
  );

  const handle = () => {
    if (event) track(event);
    onClick?.();
  };

  if (href) {
    const external = href.startsWith("http");
    if (external) {
      return (
        <a className={classes} href={href} target={target ?? "_blank"} rel={rel ?? "noopener noreferrer"} onClick={handle}>
          {children}
        </a>
      );
    }
    return (
      <Link className={classes} href={href} onClick={handle}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} type={type} disabled={disabled} onClick={handle}>
      {children}
    </button>
  );
}
