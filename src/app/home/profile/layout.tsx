"use client";
import { ProfileHeaderElement, headerElement } from "@/entities/profile";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React from "react";

export default function ProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  const noLayoutPaths = [
    "/home/profile/career/mycareer",
    "/home/profile/myprofile",
  ];
  const shouldShowLayout = !noLayoutPaths.includes(pathname);

  if (!shouldShowLayout) {
    return <>{children}</>;
  }

  return (
    <div className="flex h-full flex-col items-center gap-5 p-6">
      <header className="flex w-[24rem] flex-row justify-between">
        <div className="flex w-2/5 flex-row justify-between">
          {headerElement.map((data) => (
            <ProfileHeaderElement
              key={data.id}
              content={data.content}
              route={data.route}
            ></ProfileHeaderElement>
          ))}
        </div>
        <button
          className="rounded-2xl p-1 transition-colors hover:bg-[#fcfcfc]"
          aria-label="알림"
        >
          <Image
            src="/images/profile/ph_bell-light.png"
            alt="알림"
            width={20}
            height={20}
            className="object-contain"
          />
        </button>
      </header>
      {children}
    </div>
  );
}
