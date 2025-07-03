import { userFieldType } from '@/entities/user/profile';
import { createContext } from 'react';

const defaultValue: userFieldType = {
  profile: {
    memberInfo: {
      id: 0,
      nickname: '',
      email: '',
      type: '',
    },
    interestIn: [],
  },
};

export const ProfileContext = createContext<userFieldType>(defaultValue);
