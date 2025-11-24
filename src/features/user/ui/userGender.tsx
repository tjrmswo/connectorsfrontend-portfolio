import { Button } from "@/shared";
import React from "react";
import { UseFormRegister, UseFormSetValue } from "react-hook-form";
import { ProfileFormData } from "../model/profileSchema";
import useProfileGender from "../model/useProfileGender";

export default function UserGender({
  register,
  setValue,
}: {
  register: UseFormRegister<ProfileFormData>;
  setValue: UseFormSetValue<ProfileFormData>; // 추가
}) {
  const {
    registerProps,
    genderInputRef,
    ref,
    handleGenderSelect,
    selectedGender,
  } = useProfileGender({ register, setValue });

  return (
    <div className="flex w-full flex-col gap-2">
      <div className="font-sm flex flex-row items-center font-[Pretendard] font-medium leading-[12px]">
        <span className="mr-1 text-[#000]">성별</span>
      </div>

      {/* hidden input */}
      <input
        type="hidden"
        {...registerProps}
        ref={(e) => {
          ref(e);
          genderInputRef.current = e;
        }}
      />

      <div className="flex flex-row gap-2 border-[#E0E0E0] bg-[#fff] font-[Pretendard] font-normal leading-[12px]">
        <Button
          type="button"
          className={`w-1/2 border transition-colors ${
            selectedGender === "male"
              ? "border-[#C2B2FF] bg-[#E5DFFF] text-[#6E4DDC]"
              : "border-[#e0e0e0] text-[#BDBDBD]"
          } hover:border-[#C2B2FF] hover:bg-[#E5DFFF] hover:text-[#6E4DDC]`}
          variant="outline"
          onClick={() => handleGenderSelect("male")}
        >
          남자
        </Button>
        <Button
          type="button"
          className={`w-1/2 border transition-colors ${
            selectedGender === "female"
              ? "border-[#C2B2FF] bg-[#E5DFFF] text-[#6E4DDC]"
              : "border-[#e0e0e0] text-[#BDBDBD]"
          } hover:border-[#C2B2FF] hover:bg-[#E5DFFF] hover:text-[#6E4DDC]`}
          variant="outline"
          onClick={() => handleGenderSelect("female")}
        >
          여자
        </Button>
      </div>
    </div>
  );
}
