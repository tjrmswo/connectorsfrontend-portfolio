import styled from 'styled-components';

export const MypageContainer = styled.div`
  padding: 0;
  margin: 0;
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;

  .mobileView {
    width: 24rem;
    padding: 10px;
  }

  header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #e9e9e9;
    padding-bottom: 1rem;
  }

  .otherSide {
    width: 25px;
    height: 25px;
  }

  main {
    flex: 1;
    padding: 5px;
    .mypage__userName {
      margin-top: 3rem;
      margin-bottom: 2rem;
    }
    .userName {
      font-size: 1.5rem;
      color: var(--primary);
      font-weight: 700;
    }

    .domainSection {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      padding: 8px;
    }

    .mypage__nickname {
      display: flex;
      flex-direction: column;
      gap: 7px;
    }
    .inputBg {
      display: flex;
      align-items: center;
      border-radius: 0.5rem;
      width: 100%;
      height: 3rem;
      background-color: #f5f6f9;

      input {
        width: 80%;
        height: 90%;
        font-size: 1rem;
        padding: 5px;
        border: none;
        border-radius: 0.5rem;
        outline: none;
        background-color: #f5f6f9;
      }

      button {
        padding: 3px 15px;
        border: 1px solid #cdcdcd;
        color: #686868;
        background-color: white;
        border-radius: 0.3rem;
      }
    }
    .mypage__interest {
      display: flex;
      flex-direction: column;
      gap: 10px;

      span {
      }

      p {
        color: var(--primary);
        font-size: 0.88rem;
      }
    }
  }
`;
