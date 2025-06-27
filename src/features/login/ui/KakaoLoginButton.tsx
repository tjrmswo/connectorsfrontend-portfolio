import { handleKakaoLogin } from '@features/login/api/useKakaoLogin';

export default function KakaoLoginButton() {
  return <button className="KakaoBtn" onClick={handleKakaoLogin} />;
}
