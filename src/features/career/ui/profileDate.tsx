import { DatePicker } from "@/shared";
import React from "react";

export default function ProfileDate({
  handleDateChange,
}: {
  handleDateChange: (date: Date | undefined) => void;
}) {
  return (
    <div className="flex flex-col gap-3">
      <div className="font-sm flex flex-row items-center font-[Pretendard] font-medium leading-[12px]">
        <span className="mr-1 text-[#000]">시작일</span>
        <span className="text-[#F5514B]">*</span>
      </div>
      <DatePicker handleDateChange={handleDateChange} />
    </div>
  );
}
