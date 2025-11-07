import Image from "next/image";
import { memo } from "react";
import { SplashIntroProps } from "../model/type";

export const SplashIntro = memo(({ isShowing }: SplashIntroProps) => (
  <div
    className={`m-0 flex h-full w-full transform flex-col items-center justify-center bg-[#6E4DDC] p-0`}
  >
    <div
      className={`flex w-full flex-col items-center gap-5 transition-all duration-1000 ease-linear ${isShowing ? "translate-y-0 opacity-100" : "translate-y-[10px] opacity-0"}`}
    >
      <span className="text-center font-[Pretenadrd] text-base font-normal text-[#fff]">
        커리어 로드맵 추천 솔루션
      </span>

      <Image
        className="w-3/5 object-contain"
        src="/Logo_past.png"
        alt="스플래시 스크린"
        width={200}
        height={300}
        priority={true}
        fetchPriority="high"
        quality={100}
      />
    </div>
  </div>
));

SplashIntro.displayName = "SplashIntro";
