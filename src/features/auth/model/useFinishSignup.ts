import { useMutation } from "@tanstack/react-query";
import { LoginErrorType, LoginSuccessType } from "./type";
import { apiInstance, useCustomRouter } from "@/shared";

export default function useFinishSignup() {
  const { navigate } = useCustomRouter();

  const goHome = useMutation<LoginSuccessType, LoginErrorType>({
    mutationKey: ["upgradeAuth"],
    mutationFn: async () => {
      const response: LoginSuccessType = await apiInstance.post(
        "/auth/token/refresh",
      );
      console.log(response);
      return response;
    },
    onSuccess: (data: LoginSuccessType) => {
      // console.log(data);
      if (data.status === 200) {
        const term = setTimeout(() => {
          navigate({ path: "/home", type: "push" });
        }, 1700);

        return () => clearTimeout(term);
      }
    },
    onError: (e) => {
      console.log("", e);
    },
  });

  const handleButton = () => {
    goHome.mutate();
  };
  return { handleButton };
}
