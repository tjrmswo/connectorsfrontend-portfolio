'use client';
import Header from '@/app/shared/components/header';
import { tabIcons } from '@/app/home/shared/constants/bottomTabContents';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

function HomeWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [tabStatus, setTabStatus] = useState<number>(0); // useState for tabStatus

  useEffect(() => {
    const pathSuffix = pathname.slice(6);

    switch (pathSuffix) {
      case 'content':
        setTabStatus(1);
        break;
      case 'expert':
        setTabStatus(2);
        break;
      case 'like':
        setTabStatus(3);
        break;
      case 'report':
        setTabStatus(4);
        break;
      default:
        setTabStatus(0);
        break;
    }

    console.log(tabStatus);
  }, [pathname]);

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Header />
      {children}
      <nav className="bottomTab">
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            boxShadow: '0 2px 8px 3px #f3f1f3',
            justifyContent: 'space-around',
          }}
        >
          {tabIcons.map((icon, index) => {
            return (
              <Link
                href={`https://localhost:3000/${icon.path}`}
                key={index}
                onClick={() => setTabStatus(index)}
              >
                <div className="tabCol">
                  <img
                    className="tabIcon"
                    src={index === tabStatus ? icon.active : icon.normal}
                  />
                  <span className={index === tabStatus ? 'active' : undefined}>
                    {icon.name}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}

export default HomeWrapper;
