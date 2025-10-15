"use client";

import { HomeContainer } from "@/app/home/styes";
import Image from "next/image";
import Link from "next/link";
import { experts } from "@/shared/constants/experts";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

export default function Home() {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <HomeContainer>
      {/* <Header /> */}
      <nav>
        {/* banner */}
        <Slider {...settings}>
          <Link href="https://connectorsforme.com/%EC%BB%A4%EB%A6%AC%EC%96%B4-%EC%A0%84%EB%AC%B8%EA%B0%80%EB%93%A4%EA%B3%BC-20%EB%B6%84%EA%B0%84-11-%ED%99%94%EC%83%81-%EB%B0%8B%EC%97%85%EC%9D%84-500%EC%9B%90%EC%97%90-%EC%9D%B4%EB%B2%A4%ED%8A%B8/">
            <Image
              className="banner"
              src={
                "https://connecting-road-image-bucket.s3.ap-northeast-2.amazonaws.com/Banner1.png"
              }
              alt="banner01"
              width={150}
              height={120}
            />
          </Link>
          <Link href="https://tally.so/r/melY5q">
            <Image
              className="banner"
              src={
                "https://connecting-road-image-bucket.s3.ap-northeast-2.amazonaws.com/freecoupon-banner.png"
              }
              alt="banner02"
              width={150}
              height={120}
            />
          </Link>
          <Link href="https://connectorsforme.com/%F0%9F%8E%87%EB%82%98%EB%A7%8C%EC%9D%98-%EC%BB%A4%EB%A6%AC%EC%96%B4-%EB%A1%9C%EB%93%9C%EB%A7%B5%EC%9D%84-%EC%A0%9C%EC%95%88%ED%95%98%EB%8A%94-%EC%86%94%EB%A3%A8%EC%85%98-%EC%BB%A4%EB%84%A5%ED%84%B0/">
            <Image
              className="banner"
              src={
                "https://connecting-road-image-bucket.s3.ap-northeast-2.amazonaws.com/Banner3.png"
              }
              alt="banner01"
              width={150}
              height={120}
            />
          </Link>
        </Slider>

        <div className="wrap_a">
          <a href="#">전략/기획</a>
          <a href="#">마케팅</a>
          <a href="#">프로그래밍</a>
          <a href="#">HR</a>
          <a href="#">창업/N잡</a>
          <a href="#">디자인</a>
        </div>
      </nav>

      <main>
        {/* 전문가 */}
        <div style={{ marginBottom: "0.5rem" }}>
          <div className="moreExpert">
            <h3>
              <span className="semiTitle">전문가 </span>
              살펴보기
            </h3>
            <Link href={"/"} style={{ display: "flex", alignItems: "center" }}>
              더보기
              <Image
                src={"/images/home/arrow_more.svg"}
                alt="더보기"
                width={20}
                height={20}
              />
            </Link>
          </div>
          <div className="dataSection">
            {experts.map((data) => (
              <div className="individualSection" key={data.id}>
                <div>
                  <Link href={"/"} style={{ cursor: "pointer" }}>
                    <Image
                      src={data.src}
                      alt="전문가 사진"
                      width={160}
                      height={120}
                    />
                  </Link>
                  <Image
                    className="itemLike"
                    // src={
                    //   data.isWished
                    //     ? '/images/home/nav-like-active.svg'
                    //     : '/images/home/like.svg'
                    // }
                    src={"/images/home/like.svg"}
                    alt="하트"
                    width={20}
                    height={20}
                    // onClick={() => {
                    //   data.isWished
                    //     ? removeMyFavorities.mutate(data.id)
                    //     : includeMyFavorities.mutate(data.id);
                    // }}
                  />

                  <p>{data.expertName}</p>
                  <p>{`#${data.field}`}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* 콘텐츠 */}
        <div>
          <div className="moreExpert">
            <h3>
              <span className="semiTitle">콘텐츠 </span>
              살펴보기
            </h3>
            <Link
              href={"/home/content"}
              style={{ display: "flex", alignItems: "center" }}
            >
              더보기
              <Image
                src={"/images/home/arrow_more.svg"}
                alt="더보기"
                width={20}
                height={20}
              />
            </Link>
          </div>
          <div className="dataSection">
            {/* {getContentData.data?.content.map((data) => (
              <div className="individualSection" key={data.id}>
                <div>
                  <Link href={'/'} style={{ cursor: 'pointer' }}>
                    <Image
                      src={data.imagePath}
                      alt="전문가 사진"
                      width={160}
                      height={120}
                    />
                  </Link>
                  <Image
                    className="itemLike"
                    src={
                      data.isWished
                        ? '/images/home/nav-like-active.svg'
                        : '/images/home/like.svg'
                    }
                    alt="하트"
                    width={20}
                    height={20}
                    onClick={() => {
                      data.isWished
                        ? removeMyFavorities.mutate(data.id)
                        : includeMyFavorities.mutate(data.id);
                    }}
                  />

                  <p>{data.title}</p>
                  <p>{`#${data.positionName}`}</p>
                </div>
              </div>
            ))} */}
          </div>
        </div>
      </main>

      <footer>
        <p>Copyright © Connectors. All Rights Reserved</p>
        <p>
          사업체명 : 커넥팅로드 대표자명 : 김한홍 사업자등록번호 : 507-74-00593
          사업장 주소 : 경기도 안산시 상록구 중보로 27 401-731호 유선번호 :
          010-6381-9134 통신판매업 번호 : 2024-경기안산-1253
        </p>
        <p>
          커넥터즈는 모든 거래에 대한 책임과 교환. 환불 민원 등의 처리를
          고객센터에서 진행합니다. 자세한 문의는 E-Mail :
          manage1@connectingforall.com, 유선 010-6381-9134으로 가능하며 고객센터
          링크는{" "}
        </p>
        <Link
          href={
            "https://connectors.oopy.io/6251c9af-02ae-44b9-acbc-778827aebaf2"
          }
        >
          https://connectors.oopy.io/6251c9af-02ae-44b9-acbc-778827aebaf2
        </Link>{" "}
        입니다.
      </footer>
    </HomeContainer>
  );
}
