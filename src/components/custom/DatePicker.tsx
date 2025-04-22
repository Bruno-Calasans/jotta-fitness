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
};

export function DatePicker({ selected, onSelect }: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !selected && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {selected ? format(selected, "d/M/Y") : <span>Escolha uma data</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        // className="w-auto p-0"
        align="start"
        className="flex w-auto flex-col space-y-2 p-2"
        asChild
      >
        <div id="calender">
          <Calendar
            mode="single"
            selected={selected}
            onSelect={onSelect}
            fromDate={new Date()}
            toDate={addYears(new Date(), 1)}
            //   disabled={(date) =>
            //     date > new Date() || date < new Date("1900-01-01")
            //   }
            initialFocus
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}
