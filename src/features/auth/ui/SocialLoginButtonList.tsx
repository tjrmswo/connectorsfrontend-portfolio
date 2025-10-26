import { SetStateAction, memo } from "react";
import {
  AppleLoginButton,
  GoogleLoginButton,
  KakakoLoginButton,
  RecentLoginBadge,
} from "@/features/auth";
import type { ToastState } from "@/features/auth";

interface SocialLoginListProps {
  redirectPath: string;
  setToast: React.Dispatch<SetStateAction<ToastState>>;
  recentPlatform?: string | undefined | null;
  onSkipLogin: () => void;
}

export const SocialLoginList = memo(
  ({
    redirectPath,
    setToast,
    recentPlatform,
    onSkipLogin,
  }: SocialLoginListProps) => {
    return (
      <div className="mb-[5rem] flex h-auto w-full flex-col items-center justify-between gap-2">
        {/* 카카오 로그인 */}
        <div className="relative flex flex-row items-center">
          <KakakoLoginButton
            redirectPath={redirectPath}
            setShowToast={setToast}
          />
          {recentPlatform === "Kakao" && <RecentLoginBadge />}
        </div>

        {/* 구글 로그인 */}
        <div className="relative flex flex-row items-center">
          <GoogleLoginButton
            redirectPath={redirectPath}
            setShowToast={setToast}
          />
          {recentPlatform === "Google" && <RecentLoginBadge />}
        </div>

        {/* 애플 로그인 */}
        <div className="relative flex flex-row items-center">
          <AppleLoginButton />
          {recentPlatform === "Apple" && <RecentLoginBadge />}
        </div>

        {/* 로그인 없이 이용하기 */}
        <button onClick={onSkipLogin}>
          <span className="font-base font-[Pretendard] font-medium text-[#9BAFCD] transition-colors hover:text-black">
            로그인 없이 이용하기
          </span>
        </button>
      </div>
    );
  },
);

SocialLoginList.displayName = "SocialLoginList";
