'use client';

import { Slide, SlideButton, SplashScreenContainer } from '@/app/load/styles';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function SplashScreen() {
  const router = useRouter();
  const [showIntro, setShowIntro] = useState(true);
  const [showSlides, setShowSlides] = useState(false);
  const [slideIndex, setSlideIndex] = useState(1);

  useEffect(() => {
    const introTimer = setTimeout(() => {
      setShowIntro(false);
      setShowSlides(true);
    }, 3000);
    return () => clearTimeout(introTimer);
  }, []);

  const handleNext = () => {
    if (slideIndex === 1) {
      setSlideIndex(2);
    }
  };

  const goNext = () => {
    router.push('/home');
  };

  return (
    <SplashScreenContainer>
      {showIntro && <div id="intro"></div>}

      {showSlides && (
        <div className="slides show">
          <Slide
            bgimage={slideIndex === 1 ? '/intro02.png' : '/intro03.png'}
            delay="0s"
          >
            {slideIndex === 1 ? (
              <div>
                <p className="slideComment1">든든한 지원군이 늘 곁에 있어요</p>
                <p className="slideComment2">
                  성장 메이트, 전문가와 함께 진정한 성장을 경험하세요!
                </p>
              </div>
            ) : (
              <div>
                <p className="slideComment1">성장방안을 한 눈에 보여줘요</p>
                <p className="slideComment2">
                  커리어 향상 방안 리포트를 통해 나만의 커리어
                </p>
                <p className="slideComment2">로드맵을 그릴 수 있어요!</p>
              </div>
            )}

            <ul className="slideBtnWrapper">
              <SlideButton
                slideindex={1}
                activeindex={slideIndex}
                onClick={() => setSlideIndex(1)}
              >
                {' '}
              </SlideButton>
              <SlideButton
                slideindex={2}
                activeindex={slideIndex}
                onClick={() => setSlideIndex(2)}
              >
                {' '}
              </SlideButton>
            </ul>

            <button
              onClick={slideIndex === 1 ? handleNext : goNext}
              style={{ padding: '10px' }}
            >
              {slideIndex === 1 ? '다음' : '시작하기'}
            </button>
          </Slide>
        </div>
      )}
    </SplashScreenContainer>
  );
}
