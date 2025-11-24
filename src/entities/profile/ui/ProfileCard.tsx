import Image from "next/image";
import React from "react";
import { ProfileCardProps } from "@/entities/profile";

export default function ProfileCard({
  title,
  description,
  imageSrc,
}: ProfileCardProps) {
  return (
    <div className="w-full">
      <div className="flex h-24 w-full cursor-pointer flex-row items-start gap-3 rounded-md border border-[#eee] bg-[#fff] p-4 transition-colors hover:bg-gray-50">
        <Image
          className="size-16"
          src={imageSrc || ""}
          alt="프로필 이미지"
          width={48}
          height={48}
        />
        <div className="flex flex-col gap-0.5">
          <span className="text-lg font-semibold text-[#000]">{title}</span>
          <span className="text-sm font-normal text-[#919A9A]">
            {description}
          </span>
        </div>
      </div>
    </div>
  );
}
