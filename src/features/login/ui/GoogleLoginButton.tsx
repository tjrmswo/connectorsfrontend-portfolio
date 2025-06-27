import { handleGoogleLogin } from '@features/login/api/useGoogleLogin';

export default function GoogleLoginButton() {
  return <button className="GoogleBtn" onClick={handleGoogleLogin} />;
}
