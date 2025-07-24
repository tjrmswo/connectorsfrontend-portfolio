import '@/app/globals.css';
import { HomeContainer } from '@/app/home/styes';
import HomeWrapper from './shared/components/homeWrapper';

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <HomeContainer>
      <HomeWrapper>{children}</HomeWrapper>
    </HomeContainer>
  );
}
