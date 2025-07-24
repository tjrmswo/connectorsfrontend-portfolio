import { useFormContext } from 'react-hook-form';

export default function UserInterest() {
  const { register } = useFormContext();
  return (
    <div className="mypage__interest">
      <span>관심 분야</span>
      <p>
        {`커리어 로드맵 추천을 위해 가장 성장하고 싶은 분야 3개를
        선택해주세요`}
      </p>
      <div className="inputBg">
        <input type="text" {...register('interests.0.key')} />{' '}
        <button>변경</button>
      </div>
      <div className="inputBg">
        <input type="text" {...register('interests.1.key')} />{' '}
        <button>변경</button>
      </div>
      <div className="inputBg">
        <input type="text" {...register('interests.2.key')} />{' '}
        <button>변경</button>
      </div>
    </div>
  );
}
