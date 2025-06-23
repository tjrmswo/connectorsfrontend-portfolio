import instance from '@/shared/api/apiInstance';

export const useLogin = () => {
  const handleGoogleLogin = async () => {
    const response = await instance.get('/member/sign-in/oauth2', {
      params: { oauth2Provider: 'GOOGLE' },
      withCredentials: true,
    });
    const signInUrl = response.data.signInUrl;
    if (response.status === 200) {
      window.location.href = signInUrl;
    }
  };

  const handleKakaoLogin = async () => {
    const response = await instance.get('/member/sign-in/oauth2', {
      params: { oauth2Provider: 'KAKAO' },
      withCredentials: true,
    });
    const signInUrl = response.data.signInUrl;
    if (response.status === 200) {
      window.location.href = signInUrl;
    }
  };

  return { handleGoogleLogin, handleKakaoLogin };
};
