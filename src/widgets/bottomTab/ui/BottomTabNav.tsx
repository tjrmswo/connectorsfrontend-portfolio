"use client";
import { tabIcons } from "@/shared";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function BottomTabNav() {
  return (
    <nav className="fixed bottom-0 z-50 flex h-[60px] w-[28rem] flex-row items-center justify-evenly border-t border-[#f1f2f2] bg-white shadow-xl">
      <div className="flex w-4/5 flex-row justify-around">
        {tabIcons.map((icon) => {
          return (
            <Link
              className="group flex flex-col items-center justify-center rounded-xl transition-colors duration-300 ease-in-out"
              href={icon.path}
              key={icon.index}
            >
              <Image
                className="size-10"
                src={icon.src}
                alt="탭아이콘"
                width={15}
                height={15}
              />
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
