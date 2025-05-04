"use client";

import * as React from "react";
import { addYears, format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type DatePickerProps = {
  selected?: Date;
  onSelect?: (selectedDate: Date | undefined) => void;
  toDate?: Date;
  fromDate?: Date;
};

export function DatePicker({
  selected,
  toDate,
  fromDate,
  onSelect,
}: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "justify-start text-left font-normal text-black rounded-md",
            !selected && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {selected ? format(selected, "d/M/Y") : <span>Escolha uma data</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start" asChild>
        <div id="calender">
          <Calendar
            mode="single"
            selected={selected}
            onSelect={onSelect}
            fromDate={fromDate}
            toDate={toDate}
            initialFocus
            classNames={{
              day_today: "bg-orange-500 text-white font-bold rounded-md",
            }}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}
