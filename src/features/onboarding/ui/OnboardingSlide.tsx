import Image from "next/image";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import useHandleOnbording from "../model/useHandleOnbording";

export default function OnboardingSlide() {
  const {
    onBoardingData,
    handleSkip,
    handleButtonClick,
    slideIndex,
    sliderRef,
    settings,
  } = useHandleOnbording();

  return (
    <div className="show flex h-full w-full flex-col items-center justify-between gap-[2.5rem] opacity-100 transition-all duration-300 ease-linear">
      <div className="mr-[1rem] flex w-[28rem] flex-row justify-end pt-[2rem]">
        <button
          className="cursor-pointer border-none bg-[white] font-[Pretendard] text-[1rem] font-medium text-[#616161]"
          onClick={handleSkip}
        >
          SKIP
        </button>
      </div>
      <Slider
        className="onboarding-slider show flex h-[30rem] w-full flex-col items-center p-[5px]"
        {...settings}
        ref={sliderRef}
      >
        {onBoardingData?.map((data, index) => (
          <div className="flex h-[28rem] flex-col text-center" key={data.id}>
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
                priority={index === 0}
                fetchPriority={index === 0 ? "high" : "auto"}
                // ✅ 나머지는 lazy loading
                loading={index === 0 ? "eager" : "lazy"}
              />
            </div>
          </div>
        ))}
      </Slider>
      <div className="mb-10 flex w-full items-center justify-center">
        <button
          className="h-[3.5rem] w-4/5 cursor-pointer rounded-[0.5rem] border bg-[#6E4DDC] px-[7px] text-[1rem] font-semibold text-[white]"
          onClick={handleButtonClick}
        >
          <span className="relative bottom-[1.5px] font-[Pretendard]">
            {slideIndex >= 4 ? "커넥터즈 시작하기" : "다음"}
          </span>
        </button>
      </div>
    </div>
  );
}
