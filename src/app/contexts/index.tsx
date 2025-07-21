import { useRouter } from 'next/navigation';
import { createContext } from 'react';

interface HomeContextType {
  useHomeRouter: () => void;
}

const useHomeRouter = () => {
  const router = useRouter();

  return router.back();
};

export const HomeContext = createContext<HomeContextType>({
  useHomeRouter: () => {},
});
