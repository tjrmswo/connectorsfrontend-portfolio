"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import { useQuery } from "@tanstack/react-query";
import { onBoardingDataType } from "@/entities/splash/type";
import {
  CommonToast,
  useCustomRouter,
  QUERY_CONFIG,
  apiInstance,
} from "@/shared";
import { useAnimatedToast } from "@/features/auth";
interface CheckAuthErrorType {
  response: {
    data: {
      message: string;
      errorCode: string;
    };
  };
  status: number;
}

interface CheckAuthType {
  memberId: number;
  nickname: string;
  imagePath: string;
  email: string;
}

export default function SplashScreen() {
  const [showIntro, setShowIntro] = useState<boolean>(true);
  const [isShowing, setIsShowing] = useState<boolean>(false);
  const [showSlides, setShowSlides] = useState<boolean>(false);
  const [slideIndex, setSlideIndex] = useState<number>(0);
  const sliderRef = useRef<Slider | null>(null);

  const { navigate } = useCustomRouter();
  const { toast, shouldRender, showToast } = useAnimatedToast(1500);

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
      routingLogin();
    } else {
      handleNext();
    }
  };

  const goLastOnBoarding = () => {
    navigate({ path: "/auth/login", type: "push" });
  };

  const routingLogin = () => {
    navigate({ path: "/auth/login", type: "push" });
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

  const {
    data: checkAuth,
    isSuccess: checkAuthSuccess,
    error: checkAuthError,
    isError: authIsError,
  } = useQuery<CheckAuthType, CheckAuthErrorType>({
    queryKey: ["checkAuthLayer"],
    queryFn: async () => {
      const response = await apiInstance.post("/auth/token/refresh");
      return response.data; // 데이터만 반환
    },
    staleTime: QUERY_CONFIG.STALE_TIME,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: 0,
  });

  // 컴포넌트에서 사용
  useEffect(() => {
    if (checkAuthSuccess) {
      console.log("권한 체크 성공!");
      setTimeout(() => {
        navigate({ path: "/home", type: "push" });
      }, 2200);
    }

    if (authIsError) {
      if (checkAuthError.status === 403) {
        showToast(
          checkAuthError?.response?.data?.message || "에러가 발생했습니다",
          String(checkAuthError?.status) || "500",
        );
      }
      if (
        checkAuthError.status === 403 &&
        checkAuthError.response.data.errorCode === "ATH-002"
      ) {
        const timer = setTimeout(() => {
          navigate({ path: "/auth/termsAgreement", type: "push" });
        }, 2200);

        return () => clearTimeout(timer);
      }
      console.log("권한 체크 실패:", checkAuthError?.response.data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkAuthSuccess, authIsError, checkAuth]);

  const { data: onBoardingData } = useQuery<onBoardingDataType[]>({
    queryKey: ["onBoarding"],
    queryFn: async () => {
      const response = await apiInstance.get("/onboarding/info");
      console.log("온보딩 데이터: ", response.data);
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
