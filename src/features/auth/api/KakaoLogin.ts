import {
  generateVerifier,
  handleLoginError,
  handleLoginSuccess,
  LoginSuccessType,
  LoginErrorType,
} from "@/features/auth";
import { apiInstance, useCustomRouter } from "@/shared";
import { useMutation } from "@tanstack/react-query";
import { ReadonlyURLSearchParams } from "next/navigation";

// interface ErrorType {
//   config: {
//     baseURL: string;
//     data: string;
//     url: string;
//   };
//   response: {
//     data: {
//       errorCode: string;
//       message: string;
//       timeStamp: string;
//     };
//   };
// }

interface GoogleLoginParams {
  redirectPath: string | null;
  redirectUri: string | undefined;
}

// mutation function만 export
export async function kakaoLoginMutationFn({
  redirectPath,
  redirectUri,
}: GoogleLoginParams) {
  const codeVerifier = generateVerifier();
  const response = await apiInstance.post("/auth/oauth2/url", {
    provider: "KAKAO",
    codeVerifier,
    redirectPath,
    redirectUri,
  });

  console.log(response);

  return response;
}

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
}: {
  params: ReadonlyURLSearchParams;
  showToast: (comment: string, status: string) => void;
}) => {
  const { navigate } = useCustomRouter();

  return useMutation<LoginSuccessType, LoginErrorType>({
    mutationKey: ["KakaoLogin"],
    mutationFn: () => getKakaoAccessToken(params),
    onSuccess: (data) => handleLoginSuccess(data, navigate),
    onError: (e) => handleLoginError(e, navigate, showToast),
  });
};
