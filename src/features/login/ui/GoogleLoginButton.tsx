import { useLogin } from '@features/login/index';

export default function GoogleLoginButton() {
  const { handleGoogleLogin } = useLogin();
  return <button className="GoogleBtn" onClick={handleGoogleLogin} />;
}
