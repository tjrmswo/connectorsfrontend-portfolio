"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function ProfileHeaderElement({
  route,
  content,
}: {
  route: string;
  content: string;
}) {
  const pathname = usePathname().split("/");

  return (
    <Link href={`/home/profile/${route}`} prefetch={true}>
      <span
        className={`text-center font-[Pretendard] text-base font-semibold transition-colors duration-500 ease-in-out hover:border-b-2 hover:border-black hover:text-[#000] ${pathname[3] === route ? "border-b-2 border-black text-[#000]" : "text-[#9199A4]"}`}
      >
        {content}
      </span>
    </Link>
  );
}
