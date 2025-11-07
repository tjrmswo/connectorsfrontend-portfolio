"use client";

import { CommonToast, useAnimatedToast } from "@/shared";
import {
  SplashIntro,
  useCheckAuth,
  useSplashAnimation,
} from "@/features/splash";
import { OnboardingSlide } from "@/features/onboarding";

export default function SplashScreen() {
  const { showIntro, showSlides, isShowing } = useSplashAnimation();
  const { toast, shouldRender, showToast } = useAnimatedToast(1500);
  useCheckAuth({ showToast });

  return (
    <div className="flex h-full w-full items-center justify-center">
      <link
        rel="preload"
        as="image"
        href="/Logo_past.png"
        fetchPriority="high"
      />
      {showIntro && <SplashIntro isShowing={isShowing} />}

      {/* Slides */}
      {showSlides && <OnboardingSlide />}

      {shouldRender && (
        <div
          className={`absolute top-[2rem] rounded-lg border border-[#f4f4f4] shadow-xl transition-all duration-300 ease-in-out ${
            toast.state
              ? "translate-y-[0px] opacity-100"
              : "-translate-y-[-20px] opacity-0"
          }`}
        >
          <CommonToast content={toast.comment} status={String(toast.status)} />
        </div>
      )}
    </div>
  );
}
