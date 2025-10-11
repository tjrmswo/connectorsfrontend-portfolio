import { kakaoLoginMutationFn } from "@/features/auth/api/KakaoLogin";
import { LoginErrorType, LoginType } from "@/entities/auth/type";
import Image from "next/image";
import { useMutation } from "@tanstack/react-query";
import { useCustomRouter } from "@/shared";

export default function KakaoLoginButton({
  redirectPath,
  setShowToast,
}: LoginType) {
  const { navigate } = useCustomRouter();
  const kakaoMutation = useMutation({
    mutationKey: ["handleKakao"],
    mutationFn: () =>
      kakaoLoginMutationFn({
        redirectPath,
        redirectUri: process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI,
      }),
    onSuccess: (response) => {
      const signInUrl = response.data.url;
      window.location.href = signInUrl;
    },
    onError: (e: LoginErrorType) => {
      setShowToast({
        status: e.status,
        comment: e.response.data.message,
        state: true,
      });
      if (e.response.data.errorCode === "TPT-003") {
        setTimeout(() => {
          navigate({ path: "/auth/termsAgreement", type: "push" });
        }, 1500);
      }
    },
  });

  const handleClick = () => {
    kakaoMutation.mutate();
  };

  return (
    <button
      className="flex h-[50px] w-[21rem] cursor-pointer flex-row items-center justify-around rounded-[0.3rem] border-0 bg-[#fee500] px-[14px] font-[Pretendard] text-[16px] font-[600]"
      onClick={handleClick}
    >
      <Image
        src={"/images/login/kakaoLogo.png"}
        alt="카카오 로고"
        width={20}
        height={20}
      />
      카카오로 3초 만에 시작하기
      <div />
    </button>
  );
}
