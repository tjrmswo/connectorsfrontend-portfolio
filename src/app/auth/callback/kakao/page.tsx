'use client';
import { CSSLoader } from '@/shared';
import instance from '@/shared/api/apiInstance';
import { useMutation } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react';

export default function Provider() {
  const router = useRouter();
  const params = useSearchParams();

  const Login = useMutation({
    mutationKey: ['KakaoLogin'],
    mutationFn: async () => {
      const [code, state] = ['code', 'state'].map((d) => params.get(`${d}`));

      const response = await instance.post('/auth/oauth2/login', {
        provider: 'KAKAO',
        code,
        state,
      });

      console.log('access Token 발급: ', response);

      return response.data;
    },
    onSuccess: (data: { redirectPath: string }) => {
      setTimeout(() => {
        router.push(`${data.redirectPath}`);
      }, 1500);
    },
  });

  // const mutateLogin = useCallback(() => {
  //   Login.mutate();
  // }, [Login]);

  useEffect(() => {
    Login.mutate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <CSSLoader />;
}
