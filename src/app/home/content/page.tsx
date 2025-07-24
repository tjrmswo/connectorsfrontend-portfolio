'use client';
import { ContentContainer } from '@/app/home/content/styles';
import instance from '@/shared/api/apiInstance';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { ContentType } from '@/app/home/content/type';
import ContentSection from '@/features/content/components/contentSection';
import ContentNav from '@/features/content/components/contentNav';

export default function Content() {
  const [navStatus, setNavStatus] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [paginationList, setPaginationList] = useState<string[] | number[]>([]);

  const queryClient = useQueryClient();

  const getData = useQuery<ContentType>({
    queryKey: ['getContentsData', currentPage, navStatus],
    queryFn: async () => {
      const page = currentPage - 1;
      const params = {
        size: 1000,
        ...(navStatus !== 0 ? { positionId: navStatus } : {}),
      };

      const response = await instance.get(`/content`, {
        params,
      });

      const contentData = await instance.get(
        navStatus !== 0
          ? `/content?positionId=${navStatus}&page=${page}&size=10`
          : `/content?page=${page}&size=10`
      );

      console.log('전체 페이지: ', response.data);
      console.log('필터링 데이터: ', contentData.data);

      if (response.status === 200) {
        const totalLength = response.data?.content.length || 0;
        const pagesCount = Math.ceil(totalLength / 10);
        const indexArray = Array.from({ length: pagesCount }, (_, i) => i + 1);
        setPaginationList(indexArray);
      }

      return contentData.data;
    },
  });

  const handleCategoryChange = (num: number) => {
    setNavStatus(num);
    // 카테고리 변경 후 캐시 무효화
    queryClient.invalidateQueries({
      queryKey: ['getContentsData', currentPage, num],
    });
  };

  const includeMyFavorities = useMutation({
    mutationKey: ['includeMyFavorities'],
    mutationFn: async (id: number) => {
      const response = await instance.post(`/wish/content/${id}`);

      return response;
    },
    onSuccess: (data) => {
      console.log('찜에 추가 성공', data);
      getData.refetch();
    },
  });

  const removeMyFavorities = useMutation({
    mutationKey: ['removeMyFavorities'],
    mutationFn: async (id: number) => {
      const response = await instance.delete(`/wish/content/${id}`);

      return response;
    },
    onSuccess: (data) => {
      console.log('찜에서 삭제 성공', data);
      getData.refetch();
    },
  });

  function getCurrentPage(pageNum: number) {
    setCurrentPage(pageNum);
  }

  function getPagination(currentPage: number, totalPages: number) {
    const pages = [];

    if (totalPages < 5) {
      // 페이지 수가 적으면 모두 보여줌
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // 페이지 수가 7개 이상인 경우
      if (currentPage <= 3) {
        // 앞쪽 일 때
        pages.push(1, 2, 3, 4, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        // 끝 쪽 일 때
        pages.push(
          1,
          '...',
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages
        );
      } else if (currentPage > 3 && currentPage < totalPages - 2) {
        // 중간일 때
        pages.push(
          1,
          '...',
          currentPage - 1,
          currentPage,
          currentPage + 1,
          '...',
          totalPages
        );
      }
    }
    return pages;
  }

  const totalPages = paginationList && paginationList.length;
  const pagesToRender = getPagination(currentPage, totalPages);

  return (
    <ContentContainer>
      <ContentNav
        navStatus={navStatus}
        setNavStatus={setNavStatus}
        handleCategoryChange={handleCategoryChange}
        isFetching={getData.isFetching}
        getData={getData}
      />
      <ContentSection
        getCurrentPage={getCurrentPage}
        getData={getData}
        currentPage={currentPage}
        includeMyFavorities={includeMyFavorities}
        removeMyFavorities={removeMyFavorities}
        pagesToRender={pagesToRender}
        paginationList={paginationList}
      />
    </ContentContainer>
  );
}
