import { generateVerifier } from "@/features/auth/util/codeVerifier";
import apiInstance from "@/shared/api/apiInstance";

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

  return response;
}
