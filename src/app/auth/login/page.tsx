'use client';
import '@/app/globals.css';
import { LoginContainer } from '@/app/auth/login/styles';
import { ChevronLeft } from 'lucide-react';
import GoogleLoginButton from '@/features/login/ui/GoogleLoginButton';
import KakaoLoginButton from '@/features/login/ui/KakaoLoginButton';
import { useRouter } from 'next/navigation';

export default function Login() {
  const router = useRouter();

  return (
    <LoginContainer>
      <div className="mobileView">
        <header>
          <ChevronLeft
            width={30}
            height={30}
            style={{ cursor: 'pointer' }}
            onClick={() => router.back()}
          />
        </header>
        <main>
          <div className="middle">{`로그인 후
          진정한 성장을 경험하세요!`}</div>

          <div className="bottom">
            <p className="bubble">⚡️ 3초만에 빠른 회원가입</p>

            <div className="wrap_btn">
              <GoogleLoginButton />
              <KakaoLoginButton />
            </div>
          </div>
        </main>
      </div>
    </LoginContainer>
  );
}
