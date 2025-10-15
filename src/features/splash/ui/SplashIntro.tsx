import Image from "next/image";
import { memo } from "react";

interface SplashIntroProps {
  isShowing: boolean;
}

export const SplashIntro = memo(({ isShowing }: SplashIntroProps) => (
  <div
    className={`relative bottom-[2rem] flex h-1/5 w-full transform items-center justify-center opacity-0 transition-all duration-1000 ease-linear ${
      isShowing ? "translate-y-0 opacity-100" : "translate-y-[10px] opacity-0"
    }`}
  >
    <Image
      className="w-3/5 object-contain"
      src="/intro.png"
      alt="스플래시 스크린"
      width={200}
      height={300}
      priority
      fetchPriority="high" // ✅ 추가!
    />
  </div>
));

SplashIntro.displayName = "SplashIntro";
