import React from "react";
import type { SVGProps } from "react";

export default function ArrowUpRightIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M18 6L6 18M8 6h10v10"
      ></path>
    </svg>
  );
}
