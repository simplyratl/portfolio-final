import React from "react";
import type { SVGProps } from "react";

export default function ArrowRightIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 12h16m-7-7l7 7l-7 7"
      ></path>
    </svg>
  );
}
