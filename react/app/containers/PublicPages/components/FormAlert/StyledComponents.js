import styled, { css } from 'styled-components';

import colorConfig from 'config/style';
export const FormAlertWrapper = styled.div`
  text-align: center;
  position: relative;
  width: 100%;
  height: 0px;
  z-index: 1;
`;

export const AlertContent = styled.div`
  font-size: 14px;
  font-weight: normal;

  position: absolute;
  top: -20px;
  width: 100%;
  min-height: 40px;
  border-radius: 2px;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: #f7f7f7;
  animation: swing-in-top-fwd 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;

  &:before {
    content: '';
    position: absolute;
    top: -5px;
    left: 50%;
    width: 0;
    height: 0;
    transform: translateX(-50%);
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-bottom: 5px solid #f7f7f7;
  }

  @keyframes swing-in-top-fwd {
    0% {
      transform: rotateX(-100deg);
      transform-origin: top;
      opacity: 0;
    }
    100% {
      transform: rotateX(0deg);
      transform-origin: top;
      opacity: 1;
    }
  }

  ${props =>
    props.error &&
    css`
      color: ${colorConfig.error};
    `};

  ${props =>
    props.success &&
    css`
      color: ${colorConfig.primary};
    `};
`;
