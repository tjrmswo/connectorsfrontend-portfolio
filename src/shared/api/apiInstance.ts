import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_CONNECT_FORME_API_ADDRESS,
  timeout: 3000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

instance.interceptors.request.use(
  (config) => {
    // 예: 토큰이 있으면 헤더에 넣기
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    // 요청 전 공통 로직 또는 변수 주입
    console.log('요청 보내기 전 작업:', config.url);

    return config;
  },
  (error) => {
    // 요청 실패시
    return Promise.reject(error);
  }
);

export default instance;
