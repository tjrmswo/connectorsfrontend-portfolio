import { LoginErrorType, LoginSuccessType } from "@/entities/auth";

export const handleLoginSuccess = (
  data: LoginSuccessType,
  navigate: (options: { path: string; type: string }) => void,
) => {
  if (data.data.new) {
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
};

export const handleLoginError = (
  e: LoginErrorType,
  navigate: (options: { path: string; type: string }) => void,
  showToast: (comment: string, status: string) => void,
) => {
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
    e.response.data.errorCode === "OAUTH-003" ||
    e.response.data.errorCode === "OAUTH-004"
  ) {
    const timer = setTimeout(() => {
      navigate({ path: "/auth/login", type: "push" });
    }, 1500);
    return () => clearTimeout(timer);
  }
};
