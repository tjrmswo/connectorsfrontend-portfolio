import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
} from "@/shared";
import { ProfileGoalsType } from "../model/type";
import { checkContentsLength } from "../lib/validation";

export default function MyProfileGoals({
  goal,
  data,
  handlePlanContentChange,
  handlePlanBlur,
  planErrors,
  handleGoalChange,
}: ProfileGoalsType) {
  return (
    <div className="flex flex-col gap-5">
      <div className="font-sm flex flex-row items-center font-[Pretendard] font-medium leading-[12px]">
        <span className="mr-1 text-[#000]">목표 설정</span>
        <span className="text-[#F5514B]">*</span>
      </div>
      <Select value={goal} onValueChange={handleGoalChange}>
        <SelectTrigger className="group rounded-sm border-2 border-[#d9d9d9] font-[Pretendard] font-normal focus-visible:border-[#6E4DDC] focus-visible:outline-none focus-visible:ring-0 data-[state=open]:border-[#6E4DDC]">
          <SelectValue placeholder="단기 1주" />
        </SelectTrigger>
        <SelectContent className="rounded-sm border-2 border-[#6E4DDC] bg-white font-[Pretendard] font-normal [&_*[data-highlighted]]:bg-[#F5F5F5] [&_*[data-highlighted]]:outline-none">
          <SelectItem value="단기 1주">단기 1주</SelectItem>
          <SelectItem value="중기 2주">중기 2주</SelectItem>
          <SelectItem value="장기 3주">장기 3주</SelectItem>
        </SelectContent>
      </Select>

      {data?.plan?.map((p) => (
        <div key={p.id} className="group flex flex-col gap-4">
          <div className="font-sm flex flex-row items-center font-[Pretendard] font-medium leading-[12px]">
            <span className="mr-1 text-[#000]">{p.planTitle}</span>
            <span className="text-[#F5514B]">*</span>
          </div>
          <div className="flex flex-col gap-2">
            <Textarea
              value={p.content}
              onChange={(e) => handlePlanContentChange(p.id, e.target.value)}
              onBlur={() => handlePlanBlur(p.id, p.content)}
              className={`min-h-[80px] resize-none rounded-sm border-2 font-[Pretendard] font-normal leading-[12px] transition-colors placeholder:text-[#9199A4] ${
                planErrors[p.id]
                  ? "border-[#E25C6E]"
                  : "border-[#d9d9d9] focus:border-[#6E4DDC]"
              }`}
              placeholder="내용을 입력해 주세요"
              maxLength={201}
            />
            <div className="flex justify-between font-[Pretendard] text-sm font-normal leading-[20px]">
              <span
                className={`pl-1 ${planErrors[p.id] ? "text-[#E25C6E]" : ""}`}
              >
                {planErrors[p.id] || ""}
              </span>
              <span
                className={`pr-1 ${
                  checkContentsLength(p.content) > 200
                    ? "text-[#E25C6E]"
                    : "text-[#9199A4]"
                }`}
              >
                {checkContentsLength(p.content)}/200
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
