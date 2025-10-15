// "use client";

// import { useState, useRef, useMemo, useCallback, lazy } from "react";
// import { useCustomRouter } from "@/shared/ui";
// import { useSplashAnimation } from "@/features/splash";
// import { useOnboarding } from "@/features/splash";
// import { createSliderSettings } from "@/features/splash";
// import { SLIDER_CONFIG } from "@/features/splash";
// import { SplashIntro } from "@/features/splash";
// import type Slider from "react-slick";

// // ✅ 온보딩 슬라이더를 lazy load
// const OnboardingSlider = lazy(() =>
//   import("@/features/splash").then((mod) => ({
//     default: mod.OnboardingSlider,
//   })),
// );

// export default function SplashScreen() {
//   const [slideIndex, setSlideIndex] = useState<number>(0);
//   const sliderRef = useRef<Slider | null>(null);

//   const { navigate } = useCustomRouter();
//   const { showIntro, isShowing, showSlides } = useSplashAnimation();
//   const { data: onBoardingData } = useOnboarding();

//   // 슬라이더 설정 메모이제이션
//   const settings = useMemo(() => createSliderSettings(setSlideIndex), []);

//   // 이벤트 핸들러들 메모이제이션
//   const handleNext = useCallback(() => {
//     if (sliderRef.current && slideIndex < SLIDER_CONFIG.LAST_SLIDE_INDEX) {
//       sliderRef.current.slickNext();
//     }
//   }, [slideIndex]);

//   const goLastOnBoarding = useCallback(() => {
//     sliderRef.current?.slickGoTo(SLIDER_CONFIG.LAST_SLIDE_INDEX);
//     setSlideIndex(SLIDER_CONFIG.LAST_SLIDE_INDEX);
//   }, []);

//   const routingHome = useCallback(() => {
//     navigate({ path: "/home", type: "push" });
//   }, [navigate]);

//   const handleButtonClick = useCallback(() => {
//     if (slideIndex >= SLIDER_CONFIG.LAST_SLIDE_INDEX) {
//       routingHome();
//     } else {
//       handleNext();
//     }
//   }, [slideIndex, routingHome, handleNext]);

//   return (
//     <div className="flex h-full w-full items-center justify-center p-[5px]">
//       {/* 인트로 화면 */}
//       {showIntro && <SplashIntro isShowing={isShowing} />}
//       {/* 온보딩 슬라이드 */}
//       {showSlides && onBoardingData && (
//         <OnboardingSlider
//           onBoardingData={onBoardingData}
//           slideIndex={slideIndex}
//           sliderRef={sliderRef}
//           settings={settings}
//           onSkip={goLastOnBoarding}
//           onButtonClick={handleButtonClick}
//         />
//       )}
//     </div>
//   );
// }

"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import { useQuery } from "@tanstack/react-query";
import apiInstance from "@/shared/api/apiInstance";
import { onBoardingDataType } from "@/entities/splash/type";
import { useCustomRouter } from "@/shared/ui";
import { QUERY_CONFIG } from "@/features/splash";

export default function SplashScreen() {
  const [showIntro, setShowIntro] = useState<boolean>(true);
  const [isShowing, setIsShowing] = useState<boolean>(false);
  const [showSlides, setShowSlides] = useState<boolean>(false);
  const [slideIndex, setSlideIndex] = useState<number>(0);
  const sliderRef = useRef<Slider | null>(null);

  const { navigate } = useCustomRouter();

  useEffect(() => {
    setIsShowing(true);
    const transitionTimer = setTimeout(() => {
      setIsShowing(false);
    }, 1700);
    const introTimer = setTimeout(() => {
      setShowIntro(false);
      setShowSlides(true);
    }, 3200);
    return () => {
      clearTimeout(introTimer);
      clearTimeout(transitionTimer);
    };
  }, []);

  const handleNext = () => {
    if (sliderRef.current && slideIndex < 4) {
      // 마지막 슬라이드 전까지만
      sliderRef.current.slickNext();
    }
  };

  const handleButtonClick = () => {
    if (slideIndex >= 4) {
      // 커넥터즈 시작 또는 홈 이동
      routingHome();
    } else {
      handleNext();
    }
  };

  const goLastOnBoarding = () => {
    sliderRef.current?.slickGoTo(4);
    setSlideIndex(4);
  };

  const routingHome = () => {
    navigate({ path: "/home", type: "push" });
  };

  const settings = {
    dots: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: false,
    arrows: false,
    afterChange: (current: number) => setSlideIndex(current),
    beforeChange: (_oldIndex: number, newIndex: number) =>
      setSlideIndex(newIndex),
  };

  const { data: onBoardingData } = useQuery<onBoardingDataType[]>({
    queryKey: ["onBoarding"],
    queryFn: async () => {
      const response = await apiInstance.get("/onboarding/info");
      return response.data;
    },
    staleTime: QUERY_CONFIG.STALE_TIME,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  return (
    <div className="flex h-full w-full items-center justify-center p-[5px]">
      {showIntro && (
        <div
          className={`relative bottom-[2rem] flex h-1/5 w-full transform items-center justify-center opacity-0 transition-all duration-1000 ease-linear ${isShowing ? "translate-y-0 opacity-100" : "translate-y-[10px] opacity-0"} `}
        >
          <Image
            className="w-3/5 object-contain"
            src={"/intro.png"}
            alt="스플래시 스크린"
            width={100}
            height={150}
            fetchPriority="high"
            loading="lazy"
          />
        </div>
      )}

      {/* Slides */}
      {showSlides && (
        <div className="show flex h-full w-full flex-col items-center justify-between gap-[3rem]">
          <div className="mr-[1rem] flex w-[28rem] flex-row justify-end pt-[2rem]">
            <button
              className="text-bold cursor-pointer border-none bg-[white] text-[1rem] font-[600]"
              onClick={goLastOnBoarding}
            >
              skip
            </button>
          </div>
          <Slider
            className="show flex h-[30rem] w-full flex-col items-center p-[5px]"
            {...settings}
            ref={sliderRef}
          >
            {/* 온보딩 1 */}
            {onBoardingData?.map((data) => (
              <div
                className="flex h-[28rem] flex-col text-center"
                key={data.id}
              >
                <h2 className="text-center align-middle font-[Inter] text-[20px] text-xl font-bold leading-relaxed text-[#222]">
                  {data.title}
                </h2>
                <p className="mb-[2rem] text-center align-middle font-[Pretendard] text-[#686868]">
                  {data.content}
                </p>

                <div className="relative h-[300px] w-full">
                  <Image
                    className="object-contain"
                    src={`https://connecting-road-dev.s3.ap-northeast-2.amazonaws.com/${data.imagePath}`}
                    alt={`온보딩 이미지 ${data.id}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    loading="lazy"
                  />
                </div>
              </div>
            ))}
          </Slider>
          <div className="mb-[1.5rem] flex w-full items-center justify-center">
            <button
              className="h-[3rem] w-4/5 cursor-pointer rounded-[0.5rem] border bg-[#111] px-[7px] text-[1rem] font-[750] text-[white]"
              onClick={handleButtonClick}
            >
              <span className="relative bottom-[1.5px]">
                {slideIndex >= 4 ? "커넥터즈 시작하기" : "다음"}
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
