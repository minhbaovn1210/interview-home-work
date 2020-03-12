import React from 'react';
import styled from 'styled-components';
import { colorConfig } from 'config/style';

const RedMark = styled.span`
  color: ${colorConfig.error};
  margin-left: 5px;
  font-weight: 400;
`;

export const RequiredIndicator = () => <RedMark>*</RedMark>;

export const LabelContainer = styled.span`
  display: block;
  max-width: 100%;
  font-weight: 600;
  font-size: ${(props) => props.fontSize || 14}px;
  min-height: 16px;
  color: ${colorConfig.blackHeader};
  margin-bottom: 5px;
`;
