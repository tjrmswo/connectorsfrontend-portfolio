import { ProfileContext } from '@/app/user/mypage/contexts/profileContext';
import { useContext } from 'react';
import { useFormContext } from 'react-hook-form';

export default function UserNickname() {
  const { profile } = useContext(ProfileContext);
  const { register } = useFormContext();
  return (
    <div className="mypage__input">
      <span>닉네임</span>
      <div className="inputBg">
        <input
          type="text"
          value={profile ? profile.memberInfo.nickname : '#기쁜강아지4537'}
          {...register('nickname', { required: true })}
        />
        <button>변경</button>
      </div>
    </div>
  );
}
