import { googleLoginMutationFn } from "@/features/auth";
import { LoginErrorType, LoginType } from "@/entities/auth";
import Image from "next/image";
import { useMutation } from "@tanstack/react-query";
import { useCustomRouter } from "@/shared/ui";

export default function GoogleLoginButton({
  redirectPath,
  setShowToast,
}: LoginType) {
  const { navigate } = useCustomRouter();

  const googleMutation = useMutation({
    mutationKey: ["handleGoogle"],
    mutationFn: () =>
      googleLoginMutationFn({
        redirectPath,
        redirectUri: process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI,
      }),
    onSuccess: (response) => {
      const signInUrl = response.data.url;
      window.location.href = signInUrl;
    },
    onError: (e: LoginErrorType) => {
      console.log(e);
      setShowToast({
        status: String(e.status),
        comment: e.response.data.message,
        state: true,
      });
      if (e.response.data.errorCode === "TPT-003") {
        const timer = setTimeout(() => {
          navigate({ path: "/auth/termsAgreement", type: "push" });
        }, 1500);
        return () => clearTimeout(timer);
      } else if (e.response.data.errorCode === "OAUTH-003") {
        const timer = setTimeout(() => {
          navigate({ path: "/auth/login", type: "push" });
        }, 1500);
        return () => clearTimeout(timer);
      }
    },
  });

  const handleClick = () => {
    googleMutation.mutate();
    localStorage.setItem("recentPlatform", "Google");
  };
  return (
    <button
      className="flex h-[50px] w-[21rem] cursor-pointer flex-row items-center justify-around rounded-[0.3rem] border border-[#70737c33] bg-[#fff] bg-[white] bg-center px-[14px] font-[Pretendard] text-[15px] font-[500]"
      onClick={() => handleClick()}
    >
      <Image
        src={"/images/login/googleLogo.png"}
        alt="애플 로고"
        width={20}
        height={20}
      />
      구글 로그인하기
      <div />
    </button>
  );
}
