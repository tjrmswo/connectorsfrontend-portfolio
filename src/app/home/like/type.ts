export interface LikeContentListType {
  totalPages: number;
  totalElements: number;
  size: number;
  content: [
    {
      id: number;
      title: string;
      source: string;
      imagePath: string;
      contentPath: string;
      positionName: string;
      createdAt: string;
      isWished: boolean;
    }
  ];
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  numberOfElements: number;
  pageable: {
    offset: number;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    unpaged: boolean;
  };
  first: boolean;
  last: boolean;
  empty: boolean;
}

export interface currentPageType {
  content: number;
  expert: number;
}
