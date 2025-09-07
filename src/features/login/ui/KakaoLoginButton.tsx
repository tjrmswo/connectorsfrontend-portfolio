import { handleKakaoLogin } from '@features/login/api/useKakaoLogin';
import { LoginType } from '../type';

export default function KakaoLoginButton({ redirectPath }: LoginType) {
  if (!redirectPath) {
    return;
  }
  return (
    <button
      className="KakaoBtn"
      onClick={() => handleKakaoLogin(redirectPath)}
    />
  );
}
