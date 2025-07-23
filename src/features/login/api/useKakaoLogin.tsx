import instance from '@/shared/api/apiInstance';

export const handleKakaoLogin = async (redirectPath: string) => {
  const response = await instance.get('/member/sign-in/oauth2', {
    params: { oauth2Provider: 'KAKAO', redirectPath },
    withCredentials: true,
  });
  const signInUrl = response.data.signInUrl;
  if (response.status === 200) {
    window.location.href = signInUrl;
  }
};
