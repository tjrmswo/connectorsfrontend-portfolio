import { QUERY_CONFIG, apiInstance, useCustomRouter } from "@/shared";
import { useQuery } from "@tanstack/react-query";
import { useCallback, useRef, useState } from "react";
import Slider from "react-slick";
import { onBoardingDataType } from "./type";

export default function useHandleOnbording() {
  const sliderRef = useRef<Slider | null>(null);
  const [slideIndex, setSlideIndex] = useState<number>(0);
  const { navigate } = useCustomRouter();

  const goLastOnBoarding = () => {
    navigate({ path: "/auth/login", type: "push" });
  };

  const routingLogin = () => {
    navigate({ path: "/auth/login", type: "push" });
  };

  const handleSlideIndex = useCallback((newIndex: number) => {
    setSlideIndex(newIndex);
  }, []);

  const handleNext = () => {
    if (sliderRef.current && slideIndex < 4) {
      // 마지막 슬라이드 전까지만
      sliderRef.current.slickNext();
      setSlideIndex((prev) => prev + 1);
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

  const { data: onBoardingData } = useQuery<onBoardingDataType[]>({
    queryKey: ["onBoarding"],
    queryFn: async () => {
      const response = await apiInstance.get("/onboarding/info");
      // console.log("온보딩 데이터: ", response.data);
      return response.data;
    },
    staleTime: QUERY_CONFIG.STALE_TIME,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  const settings = {
    dots: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: false,
    arrows: false,
    afterChange: (current: number) => setSlideIndex(current),
    beforeChange: (_oldIndex: number, newIndex: number) =>
      setSlideIndex(newIndex),
    appendDots: (dots: React.ReactNode) => (
      <div
        style={{
          position: "relative",
          bottom: 0,
          padding: "20px 0",
        }}
      >
        <ul
          style={{
            margin: 0,
            padding: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "8px",
            listStyle: "none",
            flexDirection: "row",
          }}
        >
          {dots}
        </ul>
      </div>
    ),

    // ✅ 개별 dot 커스텀
    customPaging: () => (
      <div
        style={{
          width: "8px",
          height: "8px",
          borderRadius: "50%",
          backgroundColor: "#D1D5DB",
          cursor: "pointer",
          transition: "all 0.3s ease",
        }}
      />
    ),
  };

  return {
    handleSkip: goLastOnBoarding,
    slideIndex,
    handleButtonClick,
    onBoardingData,
    sliderRef,
    handleSlideIndex,
    settings,
  };
}
