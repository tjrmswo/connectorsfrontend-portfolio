"use client";
import { useCustomRouter } from "@/shared";
import Image from "next/image";
import React from "react";

export default function SignupFinish() {
  const { navigate } = useCustomRouter();

  const goHome = () => navigate({ path: "/home", type: "push" });
  return (
    <div className="flex size-full flex-col items-center justify-between gap-[2rem] p-[6px]">
      <div />
      <div className="relative bottom-[3rem] flex w-full flex-col items-center">
        <p className="relative top-[2.5rem] text-[1rem] leading-[26px] text-[#686868] text-[400]">
          커리어 로드맵 추천 솔루션
        </p>
        <Image
          className="w-4/5 object-contain"
          src={"/images/auth/signupFinishiLogo.jpg"}
          alt="회원가입완료 커넥터즈로고"
          width={150}
          height={150}
        />
        <p className="relative bottom-[2rem] text-[1rem] leading-[22px] text-[#1a1a1a] text-[900] text-[Pretendard]">
          회원가입 완료되었습니다!
        </p>
        <Image
          className="w-full object-contain"
          src={"/images/login/connectorsBigLogo.jpg"}
          alt="회원가입완료 커넥터즈로고"
          width={200}
          height={200}
        />
      </div>

      <button
        className="relative bottom-[2rem] flex h-[3rem] w-4/5 cursor-pointer items-center justify-center gap-[12px] rounded-[0.5rem] bg-[#292C33] text-[18px] leading-[23px] text-[#fff] text-[500]"
        onClick={goHome}
      >
        커넥터즈 시작하기
      </button>
    </div>
  );
}
