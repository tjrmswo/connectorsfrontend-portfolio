import Image from "next/image";
import { useMutation } from "@tanstack/react-query";
import { apiInstance, useCustomRouter } from "@/shared";
import { LoginErrorType, LoginType } from "../model/type";
import { generateVerifier } from "@/shared";

export default function GoogleLoginButton({
  redirectPath,
  setShowToast,
}: LoginType) {
  const { navigate } = useCustomRouter();

  const googleMutation = useMutation({
    mutationKey: ["handleGoogle"],
    mutationFn: async () => {
      const codeVerifier = generateVerifier();
      const response = await apiInstance.post("/auth/oauth2/url", {
        provider: "GOOGLE",
        codeVerifier,
        redirectPath,
        redirectUri: process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI,
      });
      console.log(response);
      return response;
    },
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
      className="flex h-[50px] w-[21rem] cursor-pointer flex-row items-center justify-center rounded-[0.8rem] bg-[#EEE] py-[12px] pl-[12px] pr-[75px] font-[Pretendard] text-sm font-[600]"
      onClick={() => handleClick()}
    >
      <div className="ml-2 flex w-full flex-row gap-10">
        <Image
          src={"/images/login/googleLogo.png"}
          alt="구글 로고"
          width={20}
          height={20}
        />
        <span className="flex-1">구글 로그인하기</span>
      </div>
    </button>
  );
}
