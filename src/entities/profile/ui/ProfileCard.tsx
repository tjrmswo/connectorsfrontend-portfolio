import Image from "next/image";
import React from "react";
import { ProfileCardProps } from "@/entities/profile";

export default function ProfileCard({
  title,
  description,
  imageSrc = "/images/profile/profileBasicImg.png",
}: ProfileCardProps) {
  return (
    <div className="w-full">
      <div className="flex h-16 w-full cursor-pointer flex-row items-center gap-3 rounded-md border border-[#d9d9d9] p-3 transition-colors hover:bg-gray-50">
        <Image
          className="h-12 w-12 flex-shrink-0"
          src={imageSrc} // 실제 이미지 경로로 바꿔줘야 함
          alt="프로필 이미지"
          width={48}
          height={48}
        />
        <div className="flex flex-col gap-0.5">
          <span className="text-sm font-semibold text-[#000]">{title}</span>
          <span className="text-xs font-normal text-[#919A9A]">
            {description}
          </span>
        </div>
      </div>
    </div>
  );
}
