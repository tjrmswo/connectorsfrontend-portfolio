import { useState, useEffect } from "react";
import { ANIMATION_TIMING } from "@/features/splash";
import type { ViewState } from "@/entities/splash/type";

export const useSplashAnimation = () => {
  const [viewState, setViewState] = useState<ViewState>("intro");
  const [mounted, setMounted] = useState(false); // ✅ 마운트 상태 추가

  useEffect(() => {
    // ✅ 마운트 직후 true로 변경
    setMounted(true);

    // 인트로 페이드아웃 시작
    const fadeTimer = setTimeout(() => {
      setViewState("intro-fade");
    }, ANIMATION_TIMING.INTRO_FADE_OUT);

    // 슬라이드로 전환
    const slideTimer = setTimeout(() => {
      setViewState("slides");
    }, ANIMATION_TIMING.INTRO_TOTAL);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(slideTimer);
    };
  }, []);

  return {
    showIntro: viewState === "intro" || viewState === "intro-fade",
    isShowing: viewState === "intro" && mounted, // ✅ mounted도 체크
    showSlides: viewState === "slides",
  };
};
