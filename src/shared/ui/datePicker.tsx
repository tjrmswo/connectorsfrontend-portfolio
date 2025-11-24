"use client";
import React from "react";
import { CalendarIcon } from "lucide-react";
import {
  Button,
  Input,
  Calendar,
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTitle,
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
        <Button
          id="date-picker"
          variant="ghost"
          className="absolute right-2 top-1/2 size-6 -translate-y-1/2"
          onClick={() => setOpen(true)}
        >
          <CalendarIcon className="size-3.5" />
        </Button>
        <AlertDialog open={open}>
          <AlertDialogContent className="flex w-[340px] flex-col items-center font-[Pretendard]">
            <AlertDialogTitle></AlertDialogTitle>
            <Calendar
              mode="single"
              selected={date}
              captionLayout="label"
              month={month}
              onMonthChange={setMonth}
              onSelect={(date) => {
                handleDateChange(date);
                setDate(date);
                setValue(formatDate(date));
                setOpen(false);
              }}
              locale={ko}
              fromYear={2020}
              toYear={2030}
            />
            <AlertDialogFooter className="w-full">
              <AlertDialogCancel
                className="h-12 w-full rounded-lg border-2 bg-[#6E4DDC] font-[Pretendard] font-semibold text-white hover:border-[#6E4DDC] hover:bg-[#ffffff] hover:text-[#6E4DDC]"
                onClick={() => setOpen(false)}
              >
                확인
              </AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
