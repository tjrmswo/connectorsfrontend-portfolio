export interface ContentType {
  totalPages: number;
  totalElements: number;
  size: number;
  content: Array<{
    id: number;
    title: string;
    source: string;
    imagePath: string;
    contentPath: string;
    positionName: string;
    createdAt: string;
    isWished: boolean;
  }>;
  number: number;
  sort: {
    empty: boolean;
    unsorted: boolean;
    sorted: boolean;
  };
  numberOfElements: number;
  pageable: {
    offset: number;
    sort: {
      empty: boolean;
      unsorted: boolean;
      sorted: boolean;
    };
    paged: boolean;
    unpaged: boolean;
    pageNumber: number;
    pageSize: number;
  };
  first: boolean;
  last: boolean;
  empty: boolean;
}
