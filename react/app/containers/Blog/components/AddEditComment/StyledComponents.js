import styled from 'styled-components';
import { colorConfig } from 'config/style';

export const CancelEdit = styled.span`
  color: ${colorConfig.cancel};

  :hover {
    text-decoration: underline;
  }
`;

export const EditGroup = styled.div`
  textarea {
    padding-right: 80px;
  }
`;

export const GroupEditButton = styled.div`
  position: absolute;
  right: 35px;
  top: 10px;

  span {
    padding: 2px 7px;
    border-radius: 5px;
    background-color: #f7f7f7;
    cursor: pointer;

    &:last-child {
      color: #fff;
      background-color: #05c2d1;
      margin-left: 10px;
    }

    &:hover {
      box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
    }
  }
`;

export const PostGroup = styled.div`
  div {
    display: inline-block;
    width: calc(100% - 120px);
  }

  .error-message {
    width: 100%;
  }

  @media screen and (max-width: 1366px) {
    div {
      width: calc(100% - 90px);
    }
  }

  @media screen and (max-width: 1024px) {
    div {
      width: 80%;
      margin-bottom: 5px;
    }
  }

  @media screen and (max-width: 991px) {
    div {
      width: calc(100% - 120px);
    }
  }
`;
