export { useSplashAnimation } from "./hooks/useSplashAnimation.ts";
export { createSliderSettings } from "./lib/sliderSettings";
export { SplashIntro } from "./ui/SplashIntro";
export { ANIMATION_TIMING, SLIDER_CONFIG, QUERY_CONFIG } from "./lib/constants";
export type {
  OnboardingSliderProps,
  OnboardingSlideProps,
  OnBoardingDataType,
  ViewState,
  SplashIntroProps,
  CheckAuthErrorType,
  CheckAuthType,
  UseCheckAuthProps,
} from "./model/type";
export { default as useCheckAuth } from "./model/useCheckAuth";
