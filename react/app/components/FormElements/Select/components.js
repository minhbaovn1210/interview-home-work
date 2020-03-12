/* eslint-disable react/prop-types */

import React from 'react';
import styled from 'styled-components';
import colorConfig from 'config/style';

export const ActionOption = styled.div`
  color: ${colorConfig.pink};
  padding: 10px;
  cursor: pointer;
  border-bottom: 1px solid ${colorConfig.borderInput};

  :hover {
    color: white;
    background-color: ${colorConfig.pink};
  }
`;

const ClearIcon = styled.i`
  cursor: pointer;
  padding: 5px;
  &:hover {
    color: ${colorConfig.danger};
  }
`;

// https://react-select.com/props
export const ClearIconIndicator = ({ clearValue, className }) => (
  <ClearIcon className={`zmdi zmdi-close ${className}`} onClick={clearValue} />
);
