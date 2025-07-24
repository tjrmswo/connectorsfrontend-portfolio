import { ProfileContext } from '@/app/user/mypage/contexts/profileContext';
import { useContext } from 'react';
import { useFormContext } from 'react-hook-form';

export default function UserEmail() {
  const { profile } = useContext(ProfileContext);
  const { register } = useFormContext();
  return (
    <div className="mypage__input">
      <span>이메일</span>
      <div className="inputBg">
        <input
          type="text"
          value={profile ? profile.memberInfo.email : 'example@example.com'}
          {...register('email')}
        />
        <button>변경</button>
      </div>
    </div>
  );
}
