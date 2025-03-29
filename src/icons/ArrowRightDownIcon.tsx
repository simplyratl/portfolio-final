import React from "react";
import type { SVGProps } from "react";

export function ArrowRightDownIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="m4.5 4.5l15 15m0 0V8.25m0 11.25H8.25"
      ></path>
    </svg>
  );
}
