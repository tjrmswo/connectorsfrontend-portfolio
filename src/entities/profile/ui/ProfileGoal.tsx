import Link from "next/link";
import React from "react";

export default function ProfileGoal({
  title,
  content,
  href,
}: {
  title: string;
  content: string;
  href: string;
}) {
  return (
    <div className="flex h-40 w-full max-w-[24rem] flex-col gap-4 rounded-md border-[#eee] bg-[#fff] px-4 py-5">
      <span className="font-[Pretendard] text-lg font-bold leading-6 text-[#212121]">
        {title}
      </span>
      <Link
        href={href}
        className="flex h-20 w-full flex-col items-center justify-center gap-1 rounded-md bg-[#f7f7f7] font-[Pretendard] font-normal leading-6 text-[#404040] transition-colors hover:bg-gray-50"
      >
        {content} +
      </Link>
    </div>
  );
}
