import { useLogin } from '@features/login/index';

export default function KakaoLoginButton() {
  const { handleKakaoLogin } = useLogin();
  return <button className="KakaoBtn" onClick={handleKakaoLogin} />;
}
