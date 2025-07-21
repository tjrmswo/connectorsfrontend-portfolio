import '@/app/globals.css';
import { HomeContainer } from '../styles';
import HomeWrapper from './homeWrapper';

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
