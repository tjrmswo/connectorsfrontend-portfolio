import { element } from '@/shared/constants/contentElement';
import { ContentNavType } from '@/features/content/types';

export default function ContentNav({
  navStatus,
  setNavStatus,
  handleCategoryChange,
  isFetching,
  getData,
}: ContentNavType) {
  // 캐시 데이터 여부 판별
  const isCached = !!getData.data;
  console.log('데이터 여부 판별: ', isCached, '캐싱 여부 판별:', isFetching);

  return (
    <nav>
      <div className="navWrapper">
        {element.map((e, i) => {
          if (navStatus === e.id) {
            return (
              <button className={`navBtn active`} key={i}>
                {e.title}
              </button>
            );
          } else {
            return (
              <button
                className="navBtn"
                key={i}
                onClick={() => {
                  if (isCached && isFetching === false) {
                    // 재요청 중
                    handleCategoryChange(e.id);
                  } else {
                    setNavStatus(e.id);
                  }
                }}
              >
                {e.title}
              </button>
            );
          }
        })}
      </div>
    </nav>
  );
}
