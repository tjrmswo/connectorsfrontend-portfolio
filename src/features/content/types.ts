import { ContentType } from '@/app/home/content/type';
import { UseMutationResult, UseQueryResult } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { SetStateAction } from 'react';

export interface ContentSectionType {
  getData: UseQueryResult<ContentType, Error>;
  includeMyFavorities: UseMutationResult<
    AxiosResponse<any, any>,
    Error,
    number,
    unknown
  >;
  removeMyFavorities: UseMutationResult<
    AxiosResponse<any, any>,
    Error,
    number,
    unknown
  >;
  currentPage: number;
  pagesToRender: (string | number)[];
  getCurrentPage(pageNum: number): void;
  paginationList: string[] | number[];
}

export interface ContentNavType {
  navStatus: number;
  setNavStatus: (value: SetStateAction<number>) => void;
  handleCategoryChange: (num: number) => void;
  isFetching: boolean;
  getData: UseQueryResult<ContentType, Error>;
}
