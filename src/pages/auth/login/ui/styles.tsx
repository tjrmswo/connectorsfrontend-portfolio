import styled from 'styled-components';

export const LoginContainer = styled.div`
  padding: 0;
  margin: 0;
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;

  * {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .mobileView {
    width: 24rem;
    flex: 1;
    background-image: url('/images/login/bg_sign_in.png');
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  }

  header {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    margin-top: 1rem;
  }

  main {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    flex: 1;
  }

  .middle {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    width: 100%;
    font-size: 22px;
    font-weight: 700;
    line-height: 30px;
    white-space: pre-line;
    padding: 15px;
  }

  .bottom {
    width: 90%;
  }

  .bubble {
    position: relative;
    width: fit-content;
    padding: 10px;
    margin: 0 auto;
    background: #fff;
    border-radius: 0.4em;
    box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.1);
    text-align: center;
    font-size: 12px;
    font-weight: 500;
    line-height: 20px;
    margin-bottom: 30px;

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 20%;
      width: 0;
      height: 0;
      border: 20px solid transparent;
      border-top-color: #fff;
      border-bottom: 0;
      border-left: 0;
      margin-left: -10px;
      margin-bottom: -20px;
    }
  }

  .wrap_btn {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 12px 0;
    margin-top: 16px;
  }

  .GoogleBtn {
    width: 100%;
    height: 50px !important;
    background-image: url('/images/login/bg_btn_google_login.png') !important;
    background-repeat: no-repeat !important;
    background-position: center !important;
    background-size: contain !important;
    border: 1px solid #d4d4d4;
    background-color: #ffffff;
    border-radius: 0.3rem;
    cursor: pointer;
  }

  .GoogleBtn.signup {
    background-image: url('/images/login/bg_btn_google_login.png') !important;
  }

  .GoogleBtn iframe {
    opacity: 0;
  }

  .KakaoBtn {
    width: 100%;
    height: 50px;
    padding: 10px !important;
    background-image: url('/images/login/bg_btn_kakao_login.png') !important;
    background-repeat: no-repeat !important;
    background-position: center !important;
    background-size: contain !important;
    background-color: #fee500;
    border: 0;
    border-radius: 0.3rem;
    cursor: pointer;
  }

  .KakaoBtn.signup {
    background-image: url('/images/login/bg_btn_kakao_signup.png') !important;
  }

  .horizontal {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
  }
  .or {
    width: 50px;
    height: 20px;
    background-color: #ffffff;
    font-size: 15px;
  }

  .btn_email {
    width: 100%;
    height: 50px;
    background-image: url('/images/login/bg_btn_email_login.png');
    background-repeat: no-repeat !important;
    background-size: contain !important;
    background-position: center !important;
    padding: 10px !important;
    border: 0;
    background-color: #6e4ddc;
    border-radius: 0.3rem;
    cursor: pointer;
  }

  .question a {
    color: #6e4ddc;
    font-size: 14px;
    font-weight: 500;
    line-height: 22px;
    text-decoration-line: underline;
  }
  .question p {
    color: #a0a0a0;
    font-size: 14px;
    font-weight: 400;
    line-height: 22px;
  }
`;
