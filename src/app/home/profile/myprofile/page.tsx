"use client";
import {
  UserAddress,
  UserDatePicker,
  UserEmail,
  UserGender,
  UserImage,
  UserName,
  UserPhoneNumber,
  UserSubmit,
} from "@/features/user";
import { ProfileHeader } from "@/widgets";

import React, { useEffect, useState } from "react";
import { profileSchema, ProfileFormData } from "@/features/user";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { apiInstance } from "@/shared";

export default function MyProfile() {
  const [isReady, setIsReady] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors: error },
    setValue,
    watch,
    getValues,
    control,
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    mode: "onTouched",
    defaultValues: {
      image: undefined,
      name: "",
      phone: "",
      email: "",
      gender: undefined,
      address: {
        roadAddress: "",
        detailAddress: "",
        zipCode: "",
      },
    },
  });

  const { mutate: submitProfile } = useMutation({
    mutationKey: ["submitUserProfile"],
    mutationFn: async (data: ProfileFormData) => {
      // ⭐ FormData 사용
      const formData = new FormData();

      // 이미지 파일 추가
      if (data.image && data.image.length > 0) {
        formData.append("image", data.image[0]); // File 객체 전달
      }

      if (data.gender) {
        formData.append("gender", data.gender.toUpperCase()); // MALE, FEMALE
      }

      if (data.birthDay) {
        const convertingBirthDay = data.birthDay.split(".").join("-");
        formData.append("birthDay", convertingBirthDay);
      }

      // 나머지 데이터 추가
      formData.append("name", data.name);
      formData.append("phone", data.phone || "");
      formData.append("email", data.email || "");
      formData.append("zipCode", data.address?.zipCode || "");
      formData.append("roadAddress", data.address?.roadAddress || "");

      if (data.address?.detailAddress) {
        formData.append("detailAddress", data.address.detailAddress);
      }

      // ⭐ FormData로 전송
      const response = await apiInstance.post("/career/me", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(response);
      return response.data;
    },
    onSuccess: (data) => {
      console.log("성공:", data);
    },
    onError: (e) => {
      console.log("에러:", e);
    },
  });

  // ⭐ onSubmit에서 데이터 전달
  const onSubmit = (data: ProfileFormData) => {
    console.log("Form data:", data);
    submitProfile(data);
  };

  useEffect(() => {
    // CSS 로드를 위한 약간의 딜레이
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  console.log("전체 데이터", watch());
  // react-hook-form으로 input, button 관리 0
  // button은 데이터 전부 입력 시에 바뀔 수 있게 로직 구성
  // 생년 월일 datePicker 구현 0
  // 주소 검색 api 적용
  // input 모듈화하기 - 중복되는 로직 존재(shared로 빼야 할지 내 커리어 목표 input 컴포넌트도 확인 필요 )

  return (
    <div
      className={`flex h-full min-h-full w-[28rem] flex-col transition-opacity duration-300 ${isReady ? "opacity-100" : "opacity-0"} `}
    >
      <ProfileHeader path="/home/profile/career" headerTitle="기본 정보" />

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-1 flex-col">
        <main className="flex flex-1 flex-col items-center gap-5 p-9 text-sm">
          {/* 이미지 */}
          <UserImage register={register} setValue={setValue} />
          {/* 이름 */}
          <UserName register={register} error={error} />
          {/* 생년월일 */}
          <UserDatePicker register={register} getValues={getValues} />
          {/* 성별 */}
          <UserGender register={register} setValue={setValue} />
          {/* 휴대전화 */}
          <UserPhoneNumber register={register} error={error} />
          {/* 이메일  */}
          <UserEmail
            register={register}
            error={error}
            getValues={getValues}
            setValue={setValue}
          />
          {/* 주소  카카오맵 api로 구현하기*/}
          <UserAddress
            register={register}
            error={error}
            setValue={setValue}
            watch={watch}
          />
        </main>
        <UserSubmit control={control} />
      </form>
    </div>
  );
}
