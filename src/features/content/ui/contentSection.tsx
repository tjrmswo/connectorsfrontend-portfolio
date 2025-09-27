import Image from 'next/image';
import { ContentSectionType } from '@/features/content/types';

export default function ContentSection({
  getData,
  currentPage,
  pagesToRender,
  getCurrentPage,
  paginationList,
}: ContentSectionType) {
  return (
    <section>
      <h3>최신 콘텐츠</h3>
      <div className="wrap_item">
        {getData.data?.content.map((d, i) => (
          <div className="item" key={i}>
            <Image
              className="itemImg"
              src={d.imagePath}
              alt="콘텐츠 사진"
              width={80}
              height={150}
            />

            <Image
              className="itemLike"
              src={
                d.isWished
                  ? '/images/home/nav-like-active.svg'
                  : '/images/home/like.svg'
              }
              alt="하트"
              width={30}
              height={30}
              // onClick={() => {
              //   d.isWished
              //     ? removeMyFavorities.mutate(d.id)
              //     : includeMyFavorities.mutate(d.id);
              // }}
            />
            <div className="itemContent">
              <div className="itemHeader">
                {d.source} | {d.createdAt}
              </div>
              <div className="itemTitle">{d.title}</div>
              <div className="itemFooter">{d.positionName}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="pagination">
        <div className={`${currentPage !== 1 ? 'canClicked' : ''} arrow`}>
          &lt;
        </div>
        {pagesToRender.map((p, i) =>
          p === '...' ? (
            <span key={i} className="ellipsis">
              ···
            </span>
          ) : (
            <span
              key={i}
              className={`paginationElement ${
                currentPage === p ? 'active' : ''
              }`}
              onClick={() => {
                if (typeof p === 'number') {
                  getCurrentPage(p);
                }
              }}
            >
              {p}
            </span>
          )
        )}
        <div
          className={`${
            currentPage !== paginationList.length ? 'canClicked' : ''
          } arrow`}
        >
          &gt;
        </div>
      </div>
    </section>
  );
}
