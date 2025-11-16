import { apiInstance, useCustomRouter } from "@/shared";
import { useMutation } from "@tanstack/react-query";
import { ReadonlyURLSearchParams } from "next/navigation";
import { LoginErrorType, LoginSuccessType } from "../model/type";

async function getKakaoAccessToken(params: ReadonlyURLSearchParams) {
  const [code, state] = ["code", "state"].map((d) => params.get(`${d}`));

  const response: LoginSuccessType = await apiInstance.post(
    "/auth/oauth2/login",
    {
      provider: "KAKAO",
      code,
      state,
    },
  );

  console.log("access Token 발급: ", response);

  return response;
}

export const useKakaoLogin = ({
  params,
  showToast,
  setIsUpdated,
}: {
  params: ReadonlyURLSearchParams;
  showToast: (comment: string, status: string) => void;
  setIsUpdated: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { navigate } = useCustomRouter();

  return useMutation<LoginSuccessType, LoginErrorType>({
    mutationKey: ["KakaoLogin"],
    mutationFn: () => getKakaoAccessToken(params),
    onSuccess: (data) => {
      if (data.data.status === "BLOCKED_TERMS_REQUIRED") {
        setIsUpdated((prev) => !prev);
      } else {
        showToast("로그인에 성공했습니다!", String(data.status));
        const loginTimer = setTimeout(() => {
          navigate({ path: "/home", type: "push" });
        }, 1500);

        return () => clearTimeout(loginTimer);
      }
    },

    onError: (e) => {
      const { message } = e.response.data;
      const { status } = e;
      console.log("에러 상태: ", e);

      showToast(message, String(status));
      if (e.response.data.errorCode === "ATH-002") {
        const termsTimer = setTimeout(() => {
          navigate({ path: "/auth/termsAgreement", type: "push" });
        }, 2500);
        return () => clearTimeout(termsTimer);
      } else if (
        e.response.data.errorCode === "OAC-002" ||
        e.response.data.errorCode === "LOGIN-002"
      ) {
        const timer = setTimeout(() => {
          navigate({ path: "/auth/login", type: "push" });
        }, 1500);
        return () => clearTimeout(timer);
      }
    },
  });
};
