"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";

import { cn } from "./utils";
import { buttonVariants } from "./button";

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months),
          "size-7 bg-transparent p-0 opacity-50 hover),
        nav_button_previous)])])])])])])]),
        day),
          "size-8 p-0 font-normal aria-selected),
        day_range_start) => (
          <ChevronLeft className={cn("size-4", className)} {...props} />
        ),
        IconRight) => (
          <ChevronRight className={cn("size-4", className)} {...props} />
        ),
      }}
      {...props}
    />
  );
}

export { Calendar };


