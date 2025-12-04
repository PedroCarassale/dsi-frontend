import * as React from "react"

import { cn } from "@/lib/utils"

function Input({
  className,
  type,
  ...props
}) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-9 w-full min-w-0 rounded-md border px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "bg-white border-gray-300 text-gray-900 placeholder:text-gray-500",
        "dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder:text-gray-400",
        "focus-visible:border-blue-500 focus-visible:ring-blue-500/20 focus-visible:ring-[3px]",
        "dark:focus-visible:border-blue-400 dark:focus-visible:ring-blue-400/20",
        "aria-invalid:ring-red-500/20 aria-invalid:border-red-500",
        "dark:aria-invalid:ring-red-400/20 dark:aria-invalid:border-red-400",
        "file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium",
        "file:text-gray-700 dark:file:text-gray-300",
        "selection:bg-blue-600 selection:text-white",
        "dark:selection:bg-blue-500 dark:selection:text-white",
        className
      )}
      {...props} />
  );
}

export { Input }
