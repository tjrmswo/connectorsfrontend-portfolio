// import { cookies } from 'next/headers';

// export default async function CookieAuth() {
//   const cookieStore = cookies();
//   const authCookie = (await cookieStore).get('acces-token'); // 또는 세션 쿠키명

//   const isLoggedIn = !!authCookie?.value;

//   if (!isLoggedIn) {
//     // 로그인 페이지로 리다이렉트 또는 로그인 UI 표시
//     // router.push('/login');
//   }

//   return <div>인증된 사용자 콘텐츠</div>;
// }
