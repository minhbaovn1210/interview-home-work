import styled, { css } from 'styled-components';
import { DatePicker } from 'antd';

import { colorConfig } from 'config/style';

/* eslint-disable indent */
export const CustomDatePicker = styled(DatePicker)`
  width: 100% !important;

  .ant-calendar-picker-input {
    cursor: pointer;
    border: 1px solid ${colorConfig.borderInput};

    ${(props) =>
      props.isHavePrefix &&
      css`
        padding-left: 55px !important;
        position: relative;
      `};

    ${(props) =>
      props.outlineBottom && // eslint-disable-line
      css`
        border: 0;
        border-radius: 0;
        border-bottom: 1px solid ${colorConfig.borderInput};
        outline: none;
        box-shadow: none;
        padding: 0;
        height: 32px;
      `};

    :hover {
      ${(props) =>
        props.outlineBottom && // eslint-disable-line
        css`
          border-bottom: 1 solid ${colorConfig.primary};
        `};
    }

    ${(props) =>
      props.error && // eslint-disable-line
      css`
        border-color: ${colorConfig.error} !important;
      `};

    :focus {
      box-shadow: 0 0 0 2px ${colorConfig.primary}20;
      ${(props) =>
        props.error && // eslint-disable-line
        css`
          box-shadow: 0 0 0 2px ${colorConfig.error}20;
        `};

      ${(props) =>
        props.outlineBottom && // eslint-disable-line
        css`
          box-shadow: none !important;
        `};
    }
  }
`;

export const PrefixIcon = styled.i`
  position: absolute;
  height: 20px;
  width: 30px;
  left: 12px;
  padding-top: 5px;
  font-size: 11pt !important;
  border-right: 1px solid ${colorConfig.borderInput};
  margin-top: 10px;
  color: ${colorConfig.placeHolder};
`;
