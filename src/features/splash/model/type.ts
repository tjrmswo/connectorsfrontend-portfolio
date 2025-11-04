import type Slider from "react-slick";
import type { Settings } from "react-slick";

// ✅ UI 구현 관련 타입은 feature에
export interface OnboardingSliderProps {
  onBoardingData: OnBoardingDataType[];
  slideIndex: number;
  sliderRef: React.RefObject<Slider | null>;
  settings: Settings;
  onSkip: () => void;
  onButtonClick: () => void;
}

export interface OnBoardingDataType {
  content: string;
  id: number;
  imagePath: string;
  title: string;
}

export interface OnboardingSlideProps {
  data: OnBoardingDataType;
  slideIndex: number;
  currentIndex: number;
}

export type ViewState = "hidden" | "intro" | "intro-fade" | "slides";

export interface SplashIntroProps {
  isShowing: boolean;
}

export interface CheckAuthErrorType {
  response: {
    data: {
      message: string;
      errorCode: string;
    };
  };
  status: number;
}

export interface CheckAuthType {
  redirectPath: string;
  status: string;
}

export interface UseCheckAuthProps {
  showToast: (message: string, status: string) => void;
}
