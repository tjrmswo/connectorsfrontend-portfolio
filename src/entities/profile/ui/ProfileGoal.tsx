import React from "react";

export default function ProfileGoal({
  title,
  content,
}: {
  title: string;
  content: string;
}) {
  return (
    <div className="w-full max-w-[22rem]">
      <span className="font-[Pretendard] text-sm font-normal leading-6 text-[#000]">
        {title}
      </span>
      <div className="flex h-16 w-full cursor-pointer items-center justify-center rounded-md border border-[#d9d9d9] font-[Pretendard] font-normal leading-6 text-[#404040] hover:bg-gray-50">
        {content} +
      </div>
    </div>
  );
}
