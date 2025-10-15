export interface onBoardingDataType {
  content: string;
  id: number;
  imagePath: string;
  title: string;
}

export interface OnboardingSlideProps {
  data: onBoardingDataType;
  slideIndex: number;
  currentIndex: number;
}

export type ViewState = "hidden" | "intro" | "intro-fade" | "slides";
