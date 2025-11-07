import { useState, useEffect } from "react";
import { ANIMATION_TIMING } from "../lib/constants";

export const useSplashAnimation = () => {
  const [showIntro, setShowIntro] = useState<boolean>(true);
  const [isShowing, setIsShowing] = useState<boolean>(false);
  const [showSlides, setShowSlides] = useState<boolean>(false);

  useEffect(() => {
    setIsShowing(true);
    const transitionTimer = setTimeout(() => {
      setIsShowing(false);
    }, ANIMATION_TIMING.INTRO_FADE_OUT);
    const introTimer = setTimeout(() => {
      setShowIntro(false);
      setShowSlides(true);
    }, ANIMATION_TIMING.INTRO_TOTAL);
    return () => {
      clearTimeout(introTimer);
      clearTimeout(transitionTimer);
    };
  }, []);

  // ✅ showSlides가 true일 때만 Slick CSS 로드
  useEffect(() => {
    if (showSlides) {
      // CSS를 head에 추가
      const link1 = document.createElement("link");
      link1.rel = "stylesheet";
      link1.href =
        "https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css";
      document.head.appendChild(link1);

      const link2 = document.createElement("link");
      link2.rel = "stylesheet";
      link2.href =
        "https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick-theme.css";
      document.head.appendChild(link2);

      return () => {
        // Cleanup (선택사항)
        document.head.removeChild(link1);
        document.head.removeChild(link2);
      };
    }
  }, [showSlides]);

  return { showIntro, showSlides, isShowing };
};
