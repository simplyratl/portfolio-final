import type { SVGProps } from "react";
import { cn } from "@/utils/tailwindUtils";

export default function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 82 106"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("stroke-foreground", props.className)}
      {...props}
    >
      <path
        id="logo-nr"
        d="M3.5 105C4 69.0001 14 2.00009 14 2.00009C14 2.00009 8 53.0001 28 83.0001C26.6667 64.8335 27.3 26.2 32.5 15C32.5 15 77 -5 78.5 7.00005C80 19.0001 29.5 48 29.5 48C42.4172 63.3333 68 87.5 74 63.5"
        stroke="currentColor"
        strokeWidth="6"
      ></path>
    </svg>
  );
}
