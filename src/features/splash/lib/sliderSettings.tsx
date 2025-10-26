import { memo } from "react";

// 화살표 컴포넌트를 외부로 분리하고 메모이제이션
export const SampleNextArrow = memo(() => <div style={{ display: "none" }} />);
SampleNextArrow.displayName = "SampleNextArrow";

export const SamplePrevArrow = memo(() => <div style={{ display: "none" }} />);
SamplePrevArrow.displayName = "SamplePrevArrow";

export const createSliderSettings = (
  setSlideIndex: (index: number) => void,
) => ({
  dots: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  infinite: false,
  arrows: false, // 화살표 완전히 숨김
  afterChange: (current: number) => setSlideIndex(current),
  beforeChange: (_oldIndex: number, newIndex: number) =>
    setSlideIndex(newIndex),
});
