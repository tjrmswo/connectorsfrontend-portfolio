import { ProfileError } from "@/entities/profile";
import { Input } from "@/shared";
import React from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { ProfileFormData } from "../model/profileSchema";

export default function UserName({
  register,
  error,
}: {
  register: UseFormRegister<ProfileFormData>;
  error: FieldErrors<ProfileFormData>;
}) {
  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex flex-row items-center font-[Pretendard] leading-[12px]">
        <span className="mr-1 text-sm font-semibold text-[#000]">이름</span>
        <span className="text-[#F5514B]">*</span>
      </div>
      <div className="flex flex-col gap-2">
        <Input
          {...register("name")}
          className={`rounded-sm border font-[Pretendard] font-normal leading-[12px] transition-colors placeholder:text-[#BDBDBD] ${
            error.name
              ? "border-[#E25C6E]"
              : "border-[#d9d9d9] focus:border-[#6E4DDC]"
          }`}
          placeholder="이름을 입력해 주세요"
          maxLength={21}
        />
        {error.name && <ProfileError message={error.name.message} />}
      </div>
    </div>
  );
}
