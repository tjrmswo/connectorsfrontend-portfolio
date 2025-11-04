import { apiInstance, useCustomRouter } from "@/shared";
import { useMutation } from "@tanstack/react-query";
import { ReadonlyURLSearchParams } from "next/navigation";
import { LoginErrorType, LoginSuccessType } from "../model/type";

async function getGoogleAccessToken(params: ReadonlyURLSearchParams) {
  const [code, state] = ["code", "state"].map((d) => params.get(`${d}`));

  const response: LoginSuccessType = await apiInstance.post(
    "/auth/oauth2/login",
    {
      provider: "GOOGLE",
      code,
      state,
    },
  );

  console.log("access Token 발급: ", response);

  return response;
}

export const useGoogleLogin = ({
  params,
  showToast,
}: {
  params: ReadonlyURLSearchParams;
  showToast: (comment: string, status: string) => void;
}) => {
  const { navigate } = useCustomRouter();

  return useMutation<LoginSuccessType, LoginErrorType>({
    mutationKey: ["GoogleLogin"],
    mutationFn: () => getGoogleAccessToken(params),
    onSuccess: (data) => {
      if (data.data.status === "BLOCKED_TERMS_REQUIRED") {
        showToast("권한체크가 필요한 사용자입니다.", String(403));
        const termTimer = setTimeout(() => {
          navigate({ path: "/auth/termsAgreement", type: "push" });
        }, 1500);

        return () => clearTimeout(termTimer);
      } else {
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
        e.response.data.errorCode === "OAUTH-004"
      ) {
        const timer = setTimeout(() => {
          navigate({ path: "/auth/login", type: "push" });
        }, 1500);
        return () => clearTimeout(timer);
      }
    },
  });
};
