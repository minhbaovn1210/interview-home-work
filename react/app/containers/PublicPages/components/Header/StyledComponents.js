import styled from 'styled-components';

import colorConfig from 'config/style';

export const Wrapper = styled.div`
  position: fixed;
  height: 70px;
  top: 0;
  left: 0;
  width: 100%;
  background-color: ${colorConfig.darkPrimary};
  padding-top: 15px;
  padding-left: 40px;
  z-index: 1;

  img {
    height: 40px;
  }

  @media only screen and (max-width: 767px) {
    padding-left: 24px;
  }
`;

export const HeaderLink = styled.div`
  position: fixed;
  right: 40px;
  top: 20px;

  a {
    font-size: 16px;
    margin-left: 48px;
    padding-bottom: 22px;
    color: ${colorConfig.borderInput};
    border-bottom: 5px solid transparent;
    font-weight: bold;

    &:hover,
    &.active {
      color: ${colorConfig.whiteText};
      border-bottom-color: ${colorConfig.whiteText};
    }
  }

  @media only screen and (max-width: 767px) {
    right: 20px;
  }
`;
