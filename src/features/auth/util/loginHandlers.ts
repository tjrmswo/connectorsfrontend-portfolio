import { LoginErrorType } from "@/entities/auth";

export const handleLoginSuccess = (
  data: { new: boolean; redirectPath: string },
  navigate: (options: { path: string; type: string }) => void,
) => {
  if (data.new) {
    const termTimer = setTimeout(() => {
      navigate({ path: "/auth/termsAgreement", type: "push" });
    }, 1500);

    return () => clearTimeout(termTimer);
  } else {
    const loginTimer = setTimeout(() => {
      navigate({ path: data.redirectPath, type: "push" });
    }, 1500);

    return () => clearTimeout(loginTimer);
  }
};

export const handleLoginError = (
  e: LoginErrorType,
  navigate: (options: { path: string; type: string }) => void,
) => {
  console.log(
    "에러 상태: ",
    e.response.data.errorCode,
    e.response.data.message,
  );

  if (e.response.data.errorCode === "ATH-002") {
    const termsTimer = setTimeout(() => {
      navigate({ path: "/auth/termsAgreement", type: "push" });
    }, 2500);
    return () => clearTimeout(termsTimer);
  }
};
