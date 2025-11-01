"use client";
import React from "react";
import { CalendarIcon } from "lucide-react";
import {
  Button,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Calendar,
} from "@/shared";
import { useState } from "react";
import { ko } from "date-fns/locale";

function formatDate(date: Date | undefined) {
  if (!date) {
    return "";
  }

  return date.toLocaleDateString("ko-KR", {
    day: "2-digit",
    month: "2-digit",
    // year: "numeric",
    weekday: "short",
  });
}

function isValidDate(date: Date | undefined) {
  if (!date) {
    return false;
  }
  return !isNaN(date.getTime());
}

export function DatePicker({
  handleDateChange,
}: {
  handleDateChange: (date: Date | undefined) => void;
}) {
  const [open, setOpen] = useState<boolean>(false);
  const [date, setDate] = useState<Date | undefined>();
  const [month, setMonth] = useState<Date | undefined>(date);
  const [value, setValue] = useState(formatDate(date));

  return (
    <div className="flex flex-col gap-3">
      <div className="relative flex gap-2">
        <Input
          id="date"
          value={value}
          className="rounded-sm border-[#d9d9d9] bg-background pr-10 font-[Pretendard] font-normal"
          onChange={(e) => {
            const date = new Date(e.target.value);
            setValue(e.target.value);
            if (isValidDate(date)) {
              setDate(date);
              setMonth(date);
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault();
              setOpen(true);
            }
          }}
          placeholder={value}
        />
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              id="date-picker"
              variant="ghost"
              className="absolute right-2 top-1/2 size-6 -translate-y-1/2"
            >
              <CalendarIcon className="size-3.5" />
              <span className="sr-only">Select date</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="w-auto overflow-hidden border-none bg-[#F1F9FF] p-2 shadow-xl"
            align="end"
            alignOffset={-8}
            sideOffset={10}
          >
            <Calendar
              mode="single"
              selected={date}
              captionLayout="dropdown"
              month={month}
              onMonthChange={setMonth}
              onSelect={(date) => {
                handleDateChange(date);
                setDate(date);
                setValue(formatDate(date));
                setOpen(false);
              }}
              locale={ko}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
