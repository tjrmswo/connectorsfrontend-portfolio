import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import Cookie from "js-cookie";

const apiInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_CONNECT_FORME_API_ADDRESS,
  timeout: 3000,
  withCredentials: true,
});

// 요청 인터셉터
apiInstance.interceptors.request.use(
  (config) => {
    const token = Cookie.get("access-token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    console.log("요청 보내기 전 작업:", config.url, config.params);
    return config;
  },
  (error) => Promise.reject(error),
);

// AxiosRequestConfig에 _retry 속성 추가
interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}
// 응답 인터셉터
apiInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as CustomAxiosRequestConfig;

    if (originalRequest?.url?.includes("/auth/token/refresh")) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest?._retry) {
      originalRequest._retry = true;

      try {
        await axios.post(
          "https://dev-api.connectforme.com/auth/token/refresh",
          {},
          {
            withCredentials: true,
          },
        );

        console.log("액세스 토큰 재발급 성공");
        return apiInstance(originalRequest);
      } catch (refreshError: unknown) {
        // ✅ AxiosError로 타입 가드
        if (axios.isAxiosError(refreshError)) {
          const refreshStatus = refreshError.response?.status;

          if (refreshStatus === 401) {
            console.log("인증 필요 - 로그인 페이지로 이동하지 않음");
            return Promise.reject(error);
          }
        }

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default apiInstance;
