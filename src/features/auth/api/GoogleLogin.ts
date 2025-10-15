import { LoginSuccessType, LoginErrorType } from "@/entities/auth";
import {
  generateVerifier,
  handleLoginError,
  handleLoginSuccess,
} from "@/features/auth";
import { apiInstance } from "@/shared/api";
import { useCustomRouter } from "@/shared/ui";
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

  const response = await apiInstance.post("/auth/oauth2/login", {
    provider: "GOOGLE",
    code,
    state,
  });

  console.log("access Token 발급: ", response);

  return response.data;
}

export const useGoogleLogin = (params: ReadonlyURLSearchParams) => {
  const { navigate } = useCustomRouter();

  return useMutation<LoginSuccessType, LoginErrorType>({
    mutationKey: ["GoogleLogin"],
    mutationFn: () => getGoogleAccessToken(params),
    onSuccess: (data) => handleLoginSuccess(data, navigate),
    onError: (e) => handleLoginError(e, navigate),
  });
};
