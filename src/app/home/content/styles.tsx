import styled from 'styled-components';

export const ContentContainer = styled.main`
  display: flex;
  flex-direction: column;
  width: 24rem;
  height: 100%;
  background-color: white;

  nav {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-top: 1rem;
  }

  .navWrapper {
    width: 80%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 8px;

    .navBtn {
      width: 66px;
      height: 32px;
      border-radius: 40px;
      border: 1px solid #d9d9d9;
      font-size: 12px;
      font-weight: 700;
      color: #686868;
      background: transparent;
      cursor: pointer;
    }

    .active {
      border: 1px solid var(--connectors-main-color, #6e4ddc);
      color: var(--connectors-main-color, #6e4ddc);
      background-color: #efebff;
    }
  }

  section {
    padding: 0 15px 30px;
    h3 {
      font-size: 1.1rem;
      font-weight: 600;
      margin-bottom: 1rem;
    }

    .wrap_item {
      display: flex;
      flex-direction: column;
      gap: 1.5rem 0;
      align-items: center;
      margin-bottom: 2rem;

      .item {
        display: flex;
        flex-direction: column;
        border: 1px solid var(--gray-gray-05, #e9e9e9);
        position: relative;

        .itemImg {
          width: 100%;
          object-fit: fill;
        }

        .itemLike {
          position: absolute;
          top: 5px;
          right: 5px;
        }

        .itemContent {
          display: flex;
          flex-direction: column;
          padding: 10px;
          gap: 4px;
          .itemHeader {
            color: var(--gray-gray-02, #686868);
            font-size: 14px;
            font-weight: 400;
          }

          .itemTitle {
            font-size: 18px;
            font-weight: 600;
          }

          .itemFooter {
            color: var(--connectors-main-color, #6e4ddc);
            font-size: 12px;
            font-weight: 500;
          }
        }
      }
    }

    .pagination {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 4rem;

      .arrow {
        width: 2rem;
        height: 2rem;
        display: flex;
        align-items: center;
        justify-content: center;

        border-radius: 50%;
        background-color: #f5f5f5;
        color: #cdcdcd;
        font-weight: 750;
        cursor: pointer;
      }
      .canClicked {
        color: #6e4ddc;
        background-color: #f3f0fc;
      }
      .ellipsis {
        font-size: 16px;
        color: #000;
        margin: 0 5px;
      }

      .paginationElement {
        padding: 5px;
        color: #222222;
        cursor: pointer;
        font-family: 'SUIT';
      }

      .active {
        color: #6e4ddc;
        font-weight: bold;
      }
    }
  }
`;
