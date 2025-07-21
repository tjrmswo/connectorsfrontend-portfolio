import styled from 'styled-components';

export const LikeContainer = styled.main`
  height: 100%;

  .likeHeaderWrapper {
    width: 95%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }

  .likeHeader {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    width: 50%;
    height: 50px;
    color: #686868;
    border-bottom: 1px solid var(--gray-gray-04, #cdcdcd);
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
  }

  .active {
    border-bottom: 2px solid var(--gray-gray-04, #6e4ddc);
    color: var(--connectors-main-color, #6e4ddc);
    font-weight: 600;
  }

  .dataSection {
    display: flex;
    flex-direction: column;
    flex: 1;
    padding: 1rem;
  }

  .contentSection {
    width: 100%;
    height: fit-content;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    background-color: yellow;
  }

  .contentItem {
    width: 47%;
    height: fit-content;
    display: flex;
    flex-direction: column;
    margin: 5px;
    background-color: yellowgreen;
  }
`;
