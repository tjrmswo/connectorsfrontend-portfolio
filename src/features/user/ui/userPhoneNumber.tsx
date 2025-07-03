import { useFormContext } from 'react-hook-form';

export default function UserPhoneNumber() {
  const { register } = useFormContext();
  return (
    <div className="mypage__input">
      <span>휴대전화번호</span>
      <div className="inputBg">
        <input type="text" {...register('phoneNumber')} />
        <button>변경</button>
      </div>
    </div>
  );
}
