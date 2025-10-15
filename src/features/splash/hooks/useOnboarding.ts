import { useQuery } from "@tanstack/react-query";
import { apiInstance } from "@/shared/api";
import { OnBoardingDataType, QUERY_CONFIG } from "@/features/splash";

export const useOnboarding = () => {
  return useQuery<OnBoardingDataType[]>({
    queryKey: ["onBoarding"],
    queryFn: async () => {
      const response = await apiInstance.get("/onboarding/info");
      console.log(response.data);
      return response.data;
    },
    staleTime: QUERY_CONFIG.STALE_TIME,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
};
