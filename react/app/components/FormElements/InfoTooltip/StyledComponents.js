import styled from 'styled-components';
import { colorConfig } from 'config/style';

export const InfoIcon = styled.i`
  color: ${colorConfig.primary};
  margin-left: 5px;
  cursor: pointer;
  font-size: 14px !important;
  vertical-align: text-top;
`;

export const ToolTipContainer = styled.div`
  max-width: 300px;
`;
