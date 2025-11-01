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
    <div className="w-full max-w-[22rem]">
      <span className="font-[Pretendard] text-sm font-normal leading-6 text-[#000]">
        {title}
      </span>
      <Link
        href={href}
        className="flex h-16 w-full items-center justify-center rounded-md border border-[#d9d9d9] font-[Pretendard] font-normal leading-6 text-[#404040] transition-colors hover:bg-gray-50"
      >
        {content} +
      </Link>
    </div>
  );
}
