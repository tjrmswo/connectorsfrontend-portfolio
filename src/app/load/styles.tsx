import styled, { keyframes } from 'styled-components';

const fadeInOut = keyframes`
  0%, 100% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
`;

const slideIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const SplashScreenContainer = styled.div`
  width: 24rem;
  height: 100vh;

  #intro {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-image: url('/intro01.png');
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    animation: ${fadeInOut} 3s forwards;
  }

  .slides {
    display: none; /* 초기엔 숨김 */
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    height: 100%;

    &.show {
      display: flex;
    }
  }
`;

export const Slide = styled.div<{ bgimage: string; delay: string }>`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-image: ${(props) => `url(${props.bgimage})`};
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  animation: ${slideIn} 1s forwards;
  animation-delay: ${(props) => props.delay || '0s'};
  padding: 1rem;

  & > div:nth-child(1) {
    width: 100%;
  }
  & > div:nth-child(2) {
    width: 100%;
  }

  .slideComment1 {
    color: var(--black);
    font-size: 28px;
    font-style: normal;
    font-weight: 700;
    line-height: 20px;
    white-space: pre-line;
  }

  .slideComment2 {
    color: var(--gray);
    font-size: 1rem;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
    white-space: pre-line;
    margin-top: 10px;
  }

  button {
    width: 95%;
    height: 50px;
    background: #6e4ddc;
    border-radius: 8px;
    border-color: #6e4ddc;
    font-size: 20px;
    color: #fff;
    cursor: pointer;
  }

  .slideBtnWrapper {
    width: 4rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    position: absolute;
    bottom: 7rem;
    left: 2.5rem;
  }
`;

export const SlideButton = styled.div<{
  slideindex: number;
  activeindex: number;
}>`
  cursor: pointer;
  text-align: center;
  background-color: ${({ slideindex, activeindex }) =>
    slideindex === activeindex ? '#A894EA' : '#e2dbf8'};
  height: 8px;
  width: ${({ slideindex, activeindex }) =>
    slideindex === activeindex ? '2rem' : '8px'};
  transition: all 0.3s ease;
  border-radius: 0.3rem;
`;
