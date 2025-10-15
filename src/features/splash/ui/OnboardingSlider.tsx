import { memo } from "react";
import { OnboardingSlide } from "@/features/splash";
import { OnboardingSliderProps } from "@/features/splash";

// ✅ forwardRef로 래핑하여 dynamic import
// const SliderComponent = dynamic(
//   () =>
//     import("react-slick").then((mod) => {
//       // forwardRef로 래핑하여 ref 전달 가능하게
//       return forwardRef<Slider, any>((props, ref) => {
//         const Component = mod.default;
//         return <Component {...props} ref={ref} />;
//       });
//     }),
//   {
//     ssr: false,
//     loading: () => (
//       <div className="flex h-[30rem] items-center justify-center">
//         <CSSLoader />
//       </div>
//     ),
//   },
// );

export const OnboardingSlider = memo(
  ({
    onBoardingData,
    slideIndex,
    // sliderRef,
    // settings,
    onSkip,
    onButtonClick,
  }: OnboardingSliderProps) => (
    <div className="show flex h-full w-full flex-col items-center justify-between gap-[3rem]">
      {/* Skip 버튼 */}
      <div className="mr-20 flex w-full flex-row justify-end pt-[2rem]">
        <button
          className="text-bold cursor-pointer border-none bg-white text-[1rem] font-[600] transition-opacity hover:opacity-70"
          onClick={onSkip}
          aria-label="온보딩 건너뛰기"
        >
          skip
        </button>
      </div>

      {/* <SliderComponent
        className="show flex h-[30rem] w-full flex-col items-center p-[5px]"
        {...settings}
        ref={sliderRef}
      ></SliderComponent> */}

      {onBoardingData?.map((data, index) => (
        <OnboardingSlide
          key={data.id}
          data={data}
          slideIndex={index}
          currentIndex={slideIndex}
        />
      ))}

      {/* 다음/시작 버튼 */}
      <div className="mb-[1.5rem] flex w-full items-center justify-center">
        <button
          className="h-[3rem] w-4/5 cursor-pointer rounded-[0.5rem] border bg-[#111] px-[7px] text-[1rem] font-[750] text-[white] transition-transform active:scale-95"
          onClick={onButtonClick}
          aria-label={slideIndex >= 4 ? "커넥터즈 시작하기" : "다음"}
        >
          <span className="relative bottom-[1.5px]">
            {slideIndex >= 4 ? "커넥터즈 시작하기" : "다음"}
          </span>
        </button>
      </div>
    </div>
  ),
);

OnboardingSlider.displayName = "OnboardingSlider";
