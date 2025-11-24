import React from "react";

export default function ProfileError({ message }: { message?: string }) {
  if (!message) return null; // 에러 없으면 렌더링 안 함

  return (
    <span className="pl-1 font-[Pretendard] text-xs font-normal leading-[20px] text-[#E25C6E]">
      {message}
    </span>
  );
}
