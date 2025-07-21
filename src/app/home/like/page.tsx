'use client';
import { LikeContainer } from '@/app/home/like/styles';
import instance from '@/shared/api/apiInstance';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { LikeContentListType, currentPageType } from '@/app/home/like/type';
import Image from 'next/image';

export default function Like() {
  const [changeContent, setChangeContent] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<currentPageType>({
    content: 0,
    expert: 0,
  });
  // const [currentSize, setCurrentSize] = useState<number>(0);

  const getLikeContentList = useQuery<LikeContentListType>({
    queryKey: ['getLikeContentList', currentPage.content],
    queryFn: async () => {
      const currentSize = 10;
      const { content } = currentPage;
      const response = await instance.get(
        `/wish/content?page=${content}&size=${currentSize}`
      );

      console.log('컨텐츠 찜 리스트 호출 성공: ', response.data);
      return response.data;
    },
  });

  const getLikeExpertList = useQuery({
    queryKey: ['getLikeExpertList', currentPage.expert],
    queryFn: async () => {
      const currentSize = 10;
      const { expert } = currentPage;
      const response = await instance.get(
        `/wish/expert?page=${expert}&size=${currentSize}`
      );

      console.log('전문가 찜 리스트 호출 성공: ', response.data);

      return response.data;
    },
  });

  const pageDifferentState = () => {
    switch (changeContent) {
      case false:
        return (
          <section className="dataSection">
            {getLikeContentList.isSuccess && (
              <div>전문가: {getLikeContentList.data.totalElements}명</div>
            )}

            <div className="contentSection">
              {getLikeContentList.data?.content.map((d, i) => (
                <div key={i} className="contentItem">
                  <Image
                    src={d.imagePath}
                    width={100}
                    height={100}
                    alt="찜컨텐츠"
                  />
                  <p>{d.title}</p>
                </div>
              ))}
            </div>
          </section>
        );
      case true:
        return (
          <section className="dataSection">
            {getLikeContentList.isSuccess && (
              <div>컨텐츠: {getLikeContentList.data.totalElements}개</div>
            )}

            <div className="contentSection">
              {getLikeContentList.data?.content.map((d, i) => (
                <div key={i} className="contentItem">
                  <Image
                    src={d.imagePath}
                    width={100}
                    height={100}
                    alt="찜컨텐츠"
                  />
                  <p>{d.title}</p>
                </div>
              ))}
            </div>
          </section>
        );
      default:
        return (
          <section className="dataSection">
            {getLikeContentList.isSuccess && (
              <div>컨텐츠: {getLikeContentList.data.totalElements}개</div>
            )}

            <div className="contentSection">
              {getLikeContentList.data?.content.map((d, i) => (
                <div key={i} className="contentItem">
                  <Image
                    src={d.imagePath}
                    width={100}
                    height={100}
                    alt="찜컨텐츠"
                  />
                  <p>{d.title}</p>
                </div>
              ))}
            </div>
          </section>
        );
    }
  };

  return (
    <LikeContainer>
      <section className="likeHeaderWrapper">
        <div
          className={`likeHeader ${changeContent === false ? 'active' : ''}`}
          onClick={() => setChangeContent(false)}
        >
          전문가
        </div>
        <div
          className={`likeHeader ${changeContent === true ? 'active' : ''}`}
          onClick={() => setChangeContent(true)}
        >
          콘텐츠
        </div>
      </section>
      {/* <section className="dataSection">
        {getLikeContentList.isSuccess && (
          <div>컨텐츠: {getLikeContentList.data.totalElements}개</div>
        )}

        <div className="contentSection">
          {getLikeContentList.data?.content.map((d, i) => (
            <div key={i} className="contentItem">
              <Image
                src={d.imagePath}
                width={100}
                height={100}
                alt="찜컨텐츠"
              />
              <p>{d.title}</p>
            </div>
          ))}
        </div>
      </section> */}

      {pageDifferentState()}
    </LikeContainer>
  );
}
