// getQueryClient.ts
import {
  isServer,
  QueryClient,
  defaultShouldDehydrateQuery,
} from '@tanstack/react-query';

const DEFAULT_STALE_TIME = 60 * 1000;

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // staleTime을 60초로 잡아서 즉시 refetch 방지
        staleTime: DEFAULT_STALE_TIME,
      },
      dehydrate: {
        shouldDehydrateQuery: (query) =>
          defaultShouldDehydrateQuery(query) ||
          query.state.status === 'pending',
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

export function getQueryClient() {
  if (isServer) {
    // 서버단에서는 항상 queryClient를 새로 생성
    return makeQueryClient();
  } else {
    // 브라우저에서는 queryClient가 없는 경우 새 queryClient 생성
    // 이미 queryClient가 있는 경우 해당 queryClient 사용
    // 기존 queryClient를 사용해 caching이 이루어져야 하기 때문
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}
