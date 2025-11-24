import { Input } from "@/shared";
import React from "react";
import { ProfileError } from "@/entities/profile";
import { ProfileFormData } from "../model/profileSchema";
import {
  FieldErrors,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import useProfileEmail from "../model/useProfileEmail";

export default function UserEmail({
  register,
  error,
  getValues,
  setValue,
}: {
  register: UseFormRegister<ProfileFormData>;
  error: FieldErrors<ProfileFormData>;
  getValues: UseFormGetValues<ProfileFormData>;
  setValue: UseFormSetValue<ProfileFormData>;
}) {
  const {
    rest,
    ref,
    inputRef,
    localPartRef,
    updateDropdownContent,
    showDropdown,
    dropdownRef,
    handleInputChange,
  } = useProfileEmail({ register, setValue });

  return (
    <div className="flex w-full flex-col gap-2">
      <div className="font-sm flex flex-row items-center font-[Pretendard] font-medium leading-[12px]">
        <span className="mr-1 text-[#000]">이메일</span>
      </div>
      <div className="relative flex flex-col gap-2">
        <Input
          {...rest}
          ref={(e) => {
            ref(e);
            inputRef.current = e;
          }}
          onChange={handleInputChange}
          onFocus={() => {
            const currentValue = getValues("email");
            if (currentValue && !currentValue.includes("@")) {
              localPartRef.current = currentValue;
              updateDropdownContent();
              showDropdown();
            }
          }}
          className={`rounded-sm border font-[Pretendard] font-normal leading-[12px] transition-colors placeholder:text-[#BDBDBD] ${
            error.email
              ? "border-[#E25C6E]"
              : "border-[#d9d9d9] focus:border-[#6E4DDC]"
          }`}
          placeholder="이메일을 입력해주세요"
          maxLength={100}
        />

        {/* 드롭다운 */}
        <div
          ref={dropdownRef}
          style={{ display: "none" }}
          className="absolute top-full z-50 mt-1 max-h-60 w-full overflow-y-auto rounded-sm border border-[#e0e0e0] bg-white shadow-lg"
        />

        {error.email && <ProfileError message={error.email.message} />}
      </div>
    </div>
  );
}
