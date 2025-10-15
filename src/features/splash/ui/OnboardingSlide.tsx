import Image from "next/image";
import { memo } from "react";
import { OnboardingSlideProps } from "@/features/splash";

export const OnboardingSlide = memo(
  ({ data, slideIndex, currentIndex }: OnboardingSlideProps) => {
    const isCurrentSlide = slideIndex === currentIndex;
    const isFirstSlide = slideIndex === 0; // ✅ 첫 슬라이드 확인

    return (
      <div className="flex h-[28rem] flex-col text-center">
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
            priority={isCurrentSlide || isFirstSlide} // ✅ 첫 슬라이드도 priority
            // fetchPriority={isCurrentSlide || isFirstSlide ? "high" : "low"} // ✅ 추가!
            // loading={isCurrentSlide ? "eager" : "lazy"}
            // quality={85}
          />
        </div>
      </div>
    );
  },
);

OnboardingSlide.displayName = "OnboardingSlide";
