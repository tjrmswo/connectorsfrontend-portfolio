import Image from "next/image";
import React from "react";

export default function AppleLoginButton() {
  // redirectPath props 설정해야함 KakaoLoginButton 컴포넌트 참고
  return (
    <button className="flex h-[50px] w-[21rem] cursor-pointer flex-row items-center justify-around rounded-[0.3rem] border-0 bg-[#000] bg-contain bg-center bg-no-repeat p-[10px] font-[Pretendard] text-[15px] font-[500] text-[white]">
      {/* 애플 로그인 api연동 필요 */}
      <Image
        src={"/images/login/appleLogo.png"}
        alt="애플 로고"
        width={20}
        height={20}
      />
      Apple로 시작하기
      <div />
    </button>
  );
}
