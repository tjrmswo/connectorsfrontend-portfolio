import { handleGoogleLogin } from '@features/login/api/useGoogleLogin';
import { LoginType } from '../type';

export default function GoogleLoginButton({ redirectPath }: LoginType) {
  if (!redirectPath) {
    return;
  }
  return (
    <button
      className="GoogleBtn"
      onClick={() => handleGoogleLogin(redirectPath)}
    />
  );
}
