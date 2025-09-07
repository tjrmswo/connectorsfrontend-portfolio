import instance from '@/shared/api/apiInstance';
import { generateVerifier } from '@/features/login/util/codeVerifier';

export const handleKakaoLogin = async (redirectPath: string) => {
  const codeVerifier = generateVerifier();
  const redirectUri = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI;
  const response = await instance.post('/auth/oauth2/url', {
    provider: 'KAKAO',
    codeVerifier,
    redirectPath,
    redirectUri,
  });
  console.log('요청 성공', response);
  const signInUrl = response.data.url;
  if (response.status === 200) {
    window.location.href = signInUrl;
  }
};
