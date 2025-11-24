import { ProfileError } from "@/entities/profile";
import { Drawer, DrawerContent, Input } from "@/shared";
import React from "react";
import {
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { ProfileFormData } from "../model/profileSchema";
import { DialogTitle } from "@radix-ui/react-dialog";
import useProfileAddress from "../model/useProfileAddress";
import DaumPostcode from "react-daum-postcode";
import { DrawerDescription } from "@/shared/ui/drawer";

export default function UserAddress({
  register,
  error,
  setValue,
  watch,
}: {
  register: UseFormRegister<ProfileFormData>;
  error: FieldErrors<ProfileFormData>;
  setValue: UseFormSetValue<ProfileFormData>;
  watch: UseFormWatch<ProfileFormData>;
}) {
  const { open, handleDrawer, handleComplete, handleOpen } = useProfileAddress({
    setValue,
    watch,
  });

  // 카카오 맵 api로 주소 입력 기능 구현
  return (
    <div className="flex w-full flex-col gap-2">
      <div className="font-sm flex flex-row items-center font-[Pretendard] font-medium leading-[12px]">
        <span className="mr-1 text-[#000]">주소</span>
      </div>
      <div className="flex flex-col gap-2">
        <Input
          {...register("address.roadAddress")}
          className={`rounded-sm border font-[Pretendard] font-normal leading-[12px] transition-colors placeholder:text-[#BDBDBD] ${
            error.address
              ? "border-[#E25C6E]"
              : "border-[#d9d9d9] focus:border-[#6E4DDC]"
          }`}
          onClick={handleOpen}
          placeholder="주소를 입력해 주세요"
          maxLength={101}
        />
        {error.address && <ProfileError message={error.address.message} />}
        <Input
          {...register("address.detailAddress")}
          className={`rounded-sm border font-[Pretendard] font-normal leading-[12px] transition-colors placeholder:text-[#9199A4] ${
            error.address?.detailAddress
              ? "border-[#E25C6E]"
              : "border-[#d9d9d9] focus:border-[#6E4DDC]"
          }`}
          placeholder=""
          maxLength={101}
        />
        {error.address?.detailAddress && (
          <ProfileError message={error.address?.detailAddress.message} />
        )}
      </div>
      <Drawer open={open} onOpenChange={handleDrawer}>
        <DialogTitle></DialogTitle>
        <DrawerContent className="fixed inset-x-0 bottom-0 mx-auto size-full max-w-md rounded-t-[10px] sm:max-w-lg">
          <div className="h-full">
            {/* 카카오 우편번호 서비스 UI */}
            <DaumPostcode
              onComplete={handleComplete}
              className="font-[Pretendard]"
            />
          </div>
        </DrawerContent>
        <DrawerDescription></DrawerDescription>
      </Drawer>
    </div>
  );
}
