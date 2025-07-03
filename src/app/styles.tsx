'use client';
import styled from 'styled-components';

export const HomeContainer = styled.div`
  width: 24rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  /* align-items: center; */

  & > *:not(:last-child) {
    margin-bottom: 1rem;
  }

  header {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
  }

  .logo {
    width: fit-content;
  }

  .wrap_a {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 15px 0;
    padding: 25px;
  }

  .wrap_a > a {
    width: 33.33%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    height: 78px;
    color: var(--gray-gray-02, #686868);
  }

  .wrap_a > a:before {
    display: block;
    width: 45px;
    height: 45px;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    content: '';
  }

  .wrap_a > a:nth-of-type(1):before {
    background-image: url('/images/home/link_plan.svg');
  }
  .wrap_a > a:nth-of-type(2):before {
    background-image: url('/images/home/link_marketing.svg');
  }
  .wrap_a > a:nth-of-type(3):before {
    background-image: url('/images/home/link_programming.svg');
  }
  .wrap_a > a:nth-of-type(4):before {
    background-image: url('/images/home/link_hr.svg');
  }
  .wrap_a > a:nth-of-type(5):before {
    background-image: url('/images/home/link_startup.svg');
  }
  .wrap_a > a:nth-of-type(6):before {
    background-image: url('/images/home/link_design.svg');
  }

  .bottomTab {
    position: fixed;
    bottom: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 70px;
    padding: 0;
    background-color: #ffffff;
    margin-bottom: 0;

    div {
      width: 24rem;
      height: 100%;
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      align-items: center;
    }

    a {
      text-decoration: none;
      background-color: #fff;
    }

    .tabCol {
      width: 3rem;
      display: flex;
      flex-direction: column;
      align-items: center;

      span {
        color: #222222;
        text-align: center;
        font-size: 0.7rem;
        font-weight: 600;
        .active {
          color: var(--primary);
        }
      }
    }

    .tabIcon {
      width: 24px;
      height: 24px;
    }
  }

  .banner {
    width: 100%;
    height: fit-content;
    object-fit: contain;
  }

  main {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .moreExpert {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0.5rem;

    a {
      text-decoration: none;
    }

    .semiTitle {
      color: var(--primary);
      font-size: 18px;
      font-weight: 600;
    }
  }

  .dataSection {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 15px;

    .individualSection {
    }

    .individualSection p:nth-of-type(1) {
      font-size: 0.8rem;
      font-weight: 500;
    }

    .individualSection p:nth-child(3) {
      color: var(--gray-gray-02, #686868);
      font-size: 12.54px;
      font-weight: 500;
    }

    img {
      display: block;
      width: 100%;
      border-radius: 8px;
      aspect-ratio: 160 / 120;
      object-fit: cover;
    }
  }

  footer {
    padding: 20px;
    font-weight: 400;
    font-size: 12px;
    color: #999999;
    background-color: #f1f2f3;
    margin-top: 10rem;

    a {
      font-weight: 400;
      font-size: 12px;
      line-height: 18px;
      color: #999999;
      display: inline;
      text-decoration: none;
    }
  }

  footer p:nth-of-type(1) {
    font-weight: 700;
    font-size: 14px;
    line-height: 17.47px;
    color: #686868;
  }

  footer p:nth-of-type(2) {
    font-weight: 400;
    font-size: 14px;
    line-height: 24px;
    color: #999999;
    margin-top: 10px;
    white-space: pre-line;
  }

  footer p:nth-of-type(3) {
    font-weight: 400;
    font-size: 12px;
    line-height: 18px;
    color: #999999;
    white-space: pre-ling;
    word-break: break-all;
    margin-top: 20px;
  }
`;

export const LayoutContainer = styled.div`
  .bottomTab {
    position: fixed;
    bottom: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 70px;
    padding: 0;
    background-color: #ffffff;
    margin-bottom: 0;

    div {
      width: 24rem;
      height: 100%;
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      align-items: center;
    }

    a {
      text-decoration: none;
      background-color: #fff;
    }

    .tabIcon {
      width: 24px;
      height: 24px;
    }

    .tabCol {
      width: 3rem;
      display: flex;
      flex-direction: column;
      align-items: center;

      span {
        color: #222222;
        text-align: center;
        font-size: 0.7rem;
      }
    }
  }
`;
