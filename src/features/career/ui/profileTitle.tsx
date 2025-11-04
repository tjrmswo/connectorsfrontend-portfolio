import { Input } from "@/shared";
import React from "react";
import { ProfileTitleType } from "../model/type";

export default function ProfileTitle({
  title,
  titleError,
  handleTitleChange,
  handleTitleBlur,
}: ProfileTitleType) {
  return (
    <div className="flex flex-col gap-3">
      <div className="font-sm flex flex-row items-center font-[Pretendard] font-medium leading-[12px]">
        <span className="mr-1 text-[#000]">제목</span>
        <span className="text-[#F5514B]">*</span>
      </div>
      <div className="flex flex-col gap-2">
        <Input
          value={title}
          onChange={handleTitleChange}
          onBlur={handleTitleBlur}
          className={`rounded-sm border-2 font-[Pretendard] font-normal leading-[12px] transition-colors placeholder:text-[#9199A4] ${
            titleError
              ? "border-[#E25C6E]"
              : "border-[#d9d9d9] focus:border-[#6E4DDC]"
          }`}
          placeholder="제목을 입력해 주세요"
          maxLength={51}
        />
        {titleError && (
          <span className="pl-1 font-[Pretendard] text-sm font-normal leading-[20px] text-[#E25C6E]">
            {titleError}
          </span>
        )}
      </div>
    </div>
  );
}
