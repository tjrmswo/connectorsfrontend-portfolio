import { Input } from "@/shared";
import Image from "next/image";
import React from "react";
import { UseFormRegister, UseFormSetValue } from "react-hook-form";
import { ProfileFormData } from "../model/profileSchema";
import useProfileImage from "../model/useProfileImage";

export default function UserImage({
  register,
  setValue,
}: {
  register: UseFormRegister<ProfileFormData>;
  setValue: UseFormSetValue<ProfileFormData>;
}) {
  const {
    fileInputRef,
    previewImage,
    handleCameraClick,
    handleFileChange,
    registerProps,
  } = useProfileImage({ register, setValue });

  const { ref, ...rest } = registerProps;

  return (
    <>
      {/* Hidden file input with react-hook-form */}
      <Input
        {...rest}
        ref={(e) => {
          ref(e);
          fileInputRef.current = e;
        }}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      <div className="relative flex h-36 w-28 flex-col items-center justify-center rounded-lg">
        <Image
          className="h-full w-full rounded-xl object-contain"
          src={previewImage || "/images/profile/myprofileBasicImg.png"}
          alt="유저 이미지"
          width={30}
          height={30}
        />
        <Image
          className="absolute -bottom-8 -right-6 size-12 cursor-pointer border"
          src="/images/profile/myprofileCameraIcon.png"
          alt="사진 변경"
          width={48}
          height={48}
          onClick={handleCameraClick}
        />
      </div>
    </>
  );
}
