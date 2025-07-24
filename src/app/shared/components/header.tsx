'use client';
import { ChevronLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();
  const { back } = useRouter();

  console.log(pathname);

  const showDifferentComponents = () => {
    switch (pathname) {
      case '/home/like':
        return <div className="likeTitle">찜리스트</div>;
      default:
        return (
          <Image
            className="logo"
            src={'/images/home/logo.png'}
            alt="logo"
            width={160}
            height={40}
          />
        );
    }
  };
  return (
    <header>
      {pathname === '/' ? (
        <a href="#"></a>
      ) : (
        <ChevronLeft onClick={back} width={32} height={32} />
      )}
      {showDifferentComponents()}
      <Link
        href={{
          pathname: '/auth/login',
          query: { redirectPath: `${pathname}` },
        }}
        style={{ cursor: 'pointer' }}
      >
        <Image
          className="user"
          src={'/images/home/user_gray.svg'}
          alt="user_gray"
          width={30}
          height={30}
        />
      </Link>
    </header>
  );
}
