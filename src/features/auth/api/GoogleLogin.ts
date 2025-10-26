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
export async function googleLoginMutationFn({
  redirectPath,
  redirectUri,
}: GoogleLoginParams) {
  const codeVerifier = generateVerifier();
  const response = await apiInstance.post("/auth/oauth2/url", {
    provider: "GOOGLE",
    codeVerifier,
    redirectPath,
    redirectUri,
  });

  console.log(response);

  return response;
}

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
    onSuccess: (data) => handleLoginSuccess(data, navigate),
    onError: (e) => handleLoginError(e, navigate, showToast),
  });
};
