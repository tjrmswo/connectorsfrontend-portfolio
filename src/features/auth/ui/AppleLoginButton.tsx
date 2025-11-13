import Image from "next/image";
import React from "react";

export default function AppleLoginButton() {
  // redirectPath props 설정해야함 KakaoLoginButton 컴포넌트 참고

  const handleClick = () => {
    // 애플 로그인 api연동 필요
    // appleMutation.mutate();
    localStorage.setItem("recentPlatform", "Apple");
  };
  return (
    <button
      className="flex h-[50px] w-[21rem] cursor-pointer flex-row items-center justify-center rounded-[0.8rem] border-0 bg-[#000] bg-center py-[12px] pl-[12px] pr-[75px] font-[Pretendard] text-sm font-[500] text-[white]"
      onClick={handleClick}
    >
      <div className="ml-2 flex w-full flex-row gap-10">
        <Image
          src={"/images/login/appleLogo.png"}
          alt="애플 로고"
          width={20}
          height={20}
        />
        <span className="flex-1">Apple로 시작하기</span>
      </div>
    </button>
  );
}
