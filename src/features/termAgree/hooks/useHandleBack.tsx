import { useCustomRouter } from "@/shared";

export default function useHandleBack() {
  const { navigate } = useCustomRouter();

  const backLogin = () => {
    navigate({ path: "/auth/login", type: "push" });
  };
  return { backLogin };
}
