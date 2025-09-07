import axios from 'axios';
import Cookie from 'js-cookie';

const apiInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_CONNECT_FORME_API_ADDRESS,
  timeout: 3000,
  withCredentials: true,
});

// 요청 인터셉터
apiInstance.interceptors.request.use(
  (config) => {
    const token = Cookie.get('access-token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    console.log('요청 보내기 전 작업:', config.url, config.params);
    return config;
  },
  (error) => Promise.reject(error)
);

// 응답 인터셉터 - 토큰 만료시 재발급 로직 추가
apiInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 토큰 만료 또는 401 에러 체크
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        // 리프레쉬 토큰으로 새 액세스 토큰 요청
        const refreshResponse = await axios.post(
          'https://dev-api.connectforme.com/auth/token/refresh',
          {}, // 필요시 body를 넣을 수도 있음
          {
            withCredentials: true,
          }
        );

        const newAccessToken = refreshResponse.data.accessToken; // 응답 포맷에 맞게 조정
        const newRefreshToken = refreshResponse.data.refreshToken; // 필요하면 저장

        // 새 토큰 저장
        Cookie.set('access-token', newAccessToken);
        Cookie.set('refresh-token', newRefreshToken);

        // 원래 요청 헤더에 새로운 토큰 적용
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

        // 실패한 요청 재시도
        return apiInstance(originalRequest);
      } catch (refreshError) {
        // 리프레쉬 실패시 처리 (예: 로그아웃 또는 로그인 페이지 이동)
        console.error('리프레쉬 토큰 실패:', refreshError);
        // 예: 로그인 페이지로 이동시키기
        window.location.href = '/auth/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default apiInstance;
