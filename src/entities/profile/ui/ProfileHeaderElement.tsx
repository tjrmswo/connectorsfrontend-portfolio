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
        className={`inline-block w-16 pb-[2px] font-[Pretendard] text-2xl font-semibold leading-[133%] tracking-[-0.06px] transition-colors duration-500 ease-in-out hover:border-b hover:border-black hover:text-[#000] ${pathname[3] === route ? "border-b border-black text-[#000]" : "text-[#e0e0e0]"}`}
      >
        {content}
      </span>
    </Link>
  );
}
