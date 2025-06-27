'use client';
import { MypageContainer } from '@pages/user/mypage/ui/styles';
import '@app/globals.css';
import { ArrowLeft } from 'lucide-react';
import {
  FieldErrors,
  Form,
  FormProvider,
  useFieldArray,
  useForm,
} from 'react-hook-form';
import z3 from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import instance from '@/shared/api/apiInstance';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { profileType } from '@/entities/user/profile';
import { AxiosResponse } from 'axios';

const userInformationSchema = z3.object({
  nickname: z3.string(),
  phoneNumber: z3.string(),
  email: z3.string(),
  interests: z3.array(
    z3.object({
      id: z3.number(),
      name: z3.string(),
    })
  ),
});

type userInformationType = z3.infer<typeof userInformationSchema>;

export default function Mypage() {
  const [profile, setProfile] = useState<profileType>();
  const form = useForm<userInformationType>({
    resolver: zodResolver(userInformationSchema),
  });

  const { register, handleSubmit, control } = form;
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'interests',
  });

  const onSubmit = (data: userInformationType) => {
    console.log('폼 데이터:', data); // 제일 안전하고 확실함
  };

  const onInvalid = (errors: FieldErrors<userInformationType>) =>
    console.error(errors);

  // 추 후에 Tanstack Query로 마이그레이션
  async function getMyProfile() {
    try {
      const response: AxiosResponse<profileType> = await instance.get(
        '/member/profile/me'
      );

      console.log('유저 프로필 조회 성공:', response);

      const { data } = response;

      if (response.status === 200) {
        setProfile(response.data);
        form.setValue('nickname', data.memberInfo.nickname);
        form.setValue('email', data.memberInfo.email);
        const defaultValue = [
          { id: 0, name: 'its' },
          { id: 1, name: 'showTime' },
        ];
        form.setValue('interests', data.interestIn);
      }
    } catch (e) {
      console.log(e);
    }
  }

  async function modifyNickname() {
    try {
      const response = await instance.post('/member/profile/me/nickname', {
        nickname: `${form.getValues('nickname')}`,
      });

      console.log('유저 프로필 닉네임 변경 성공:', response);

      if (response.status === 200) {
      }
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getMyProfile();
  }, []);

  return (
    <MypageContainer>
      <div className="mobileView">
        <header>
          <ArrowLeft width={25} height={25} />
          <span>마이페이지</span>
          <div className="otherSide"></div>
        </header>
        <main>
          <FormProvider {...form}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(onSubmit, onInvalid)();
              }}
            >
              <div className="mypage__userName">
                <span className="userName">귀요미</span>
                <span>님</span>
              </div>

              <div className="domainSection">
                <div className="mypage__nickname">
                  <span>닉네임</span>
                  <div className="inputBg">
                    <input
                      type="text"
                      value={
                        profile
                          ? profile.memberInfo.nickname
                          : '#기쁜강아지4537'
                      }
                      {...register('nickname', { required: true })}
                    />
                    <button>변경</button>
                  </div>
                </div>
                <div className="mypage__nickname">
                  <span>휴대전화번호</span>
                  <div className="inputBg">
                    <input type="text" {...register('phoneNumber')} />
                    <button>변경</button>
                  </div>
                </div>
                <div className="mypage__nickname">
                  <span>이메일</span>
                  <div className="inputBg">
                    <input
                      type="text"
                      value={
                        profile
                          ? profile.memberInfo.email
                          : 'example@example.com'
                      }
                      {...register('email')}
                    />
                    <button>변경</button>
                  </div>
                </div>
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
              </div>
              <button type="submit">저장</button>
            </form>
          </FormProvider>
        </main>
      </div>
    </MypageContainer>
  );
}
