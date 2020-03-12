/* eslint-disable react/prop-types */
import React from 'react';
import { Input, InputNumber } from 'antd';
import styled, { css } from 'styled-components';
import { colorConfig } from 'config/style';

const inputErrorStyle = css`
  border: 1px solid ${colorConfig.error} !important;

  :focus {
    box-shadow: 0 0 0 2px ${colorConfig.error}20 !important;
  }
`;

const AntdInput = ({ error, ...rest }) => <Input {...rest} />;

const AntdTextArea = ({ error, ...rest }) => <Input.TextArea {...rest} />;

const AntdInputNumber = ({ error, ...rest }) => <InputNumber {...rest} />;

export const StyledInput = styled(AntdInput)`
  &.ant-input,
  input {
    ${(props) => props.error && inputErrorStyle};

    ${/* eslint-disable indent */
    (props) =>
      props.disabled &&
      css`
        background-color: ${colorConfig.disabled};
        border-radius: 5px;

        cursor: not-allowed;
        color: ${colorConfig.text};
      `};
  }
`;

export const StyledTextArea = styled(AntdTextArea)`
  ${(props) => props.error && inputErrorStyle};
`;

export const StyledInputNumber = styled(AntdInputNumber)`
  input {
    width: 100%;
  }
  ${(props) => props.error && inputErrorStyle};

  ${(props) =>
    props.prefix &&
    css`
      .ant-input-number-input {
        padding: 0 24px;
      }
    `}
`;

export const SuffixWrapper = styled.span`
  position: absolute;
  right: 10px;
  top: 0;
`;

export const PrefixWrapper = styled.span`
  position: absolute;
  left: 10px;
  top: 10px;
  z-index: 1;
`;

export default StyledInput;
