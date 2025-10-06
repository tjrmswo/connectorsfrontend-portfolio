"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useQuery } from "@tanstack/react-query";
import apiInstance from "@/shared/api/apiInstance";
import { onBoardingDataType } from "@/entities/boarding/type";

export default function SplashScreen() {
  const router = useRouter();
  const [showIntro, setShowIntro] = useState<boolean>(true);
  const [isShowing, setIsShowing] = useState<boolean>(false);
  const [showSlides, setShowSlides] = useState<boolean>(false);
  const [slideIndex, setSlideIndex] = useState<number>(0);
  let sliderRef = useRef<Slider | null>(null);

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
    router.push("/home");
  };

  function SampleNextArrow() {
    return <div style={{ display: "block", background: "red" }} />;
  }

  function SamplePrevArrow() {
    return <div style={{ display: "block", background: "green" }} />;
  }

  const settings = {
    dots: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: false,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    afterChange: (current: number) => setSlideIndex(current),
    beforeChange: (_oldIndex: number, newIndex: number) =>
      setSlideIndex(newIndex),
  };

  useEffect(() => {
    console.log("슬라이드 인덱스: ", slideIndex);
  }, [slideIndex]);

  const { data: onBoardingData } = useQuery<onBoardingDataType[]>({
    queryKey: ["onBoarding"],
    queryFn: async () => {
      const response = await apiInstance.get("/onboarding/info");

      console.log("온보딩 데이터 ", response.data);
      return response.data;
    },
  });

  return (
    <div className="flex h-full w-full items-center justify-center p-[5px]">
      {showIntro && (
        <div
          className={`duration-1000 relative bottom-[2rem] flex h-1/5 w-full transform items-center justify-center opacity-0 transition-all ease-linear ${isShowing ? "translate-y-0 opacity-100" : "translate-y-[10px] opacity-0"} `}
        >
          <Image
            className="w-3/5 object-contain"
            src={"/intro.png"}
            alt="스플래시 스크린"
            width={100}
            height={150}
          />
        </div>
      )}

      {/* Slides */}
      {showSlides && (
        <div className="show flex h-full w-full flex-col items-center justify-between gap-[3rem]">
          <div className="w-7/10 flex flex-row justify-end pt-[2rem]">
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
                <h2 className="mb-[1.5rem] text-[#222]">{data.title}</h2>
                <p className="mb-[3rem] text-[#686868]">{data.content}</p>
                <Image
                  className="w-full object-contain"
                  src={"/images/home/banner01.png"}
                  alt="이미지 1"
                  width={300}
                  height={200}
                />
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

      {/* 애니메이션 keyframes 정의 (tailwind config 또는 global styles에 추가 필요) */}
      <style jsx global>{`
        @keyframes slide-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .slide-in {
          animation-name: slide-in;
        }
      `}</style>
    </div>
  );
}
