/**
 * Using 24 column grid from ant design
 *
 * https://ant.design/components/grid/
 *
 */

import React from 'react';
import styled from 'styled-components';
import { Row as AntRow, Col as AntCol } from 'antd';

/**
 *
 * Row and Column for container layout
 */
export const Row = (props) => (
  <AntRow gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} type="flex" {...props} />
);
export const Col = (props) => <AntCol {...props} />;

/**
 *
 * Row and Column for Form layout
 */
export const FieldRow = (props) => (
  <AntRow gutter={{ xs: 8, sm: 16, md: 16, lg: 16 }} type="flex" {...props} />
);
export const FieldCol = styled(AntCol)`
  margin-bottom: 5px;
`;

/**
 * Limit the content width on different screen
 */

export const MaxWithContainer = styled.div`
  @media (min-width: 576px) {
    max-width: 540px;
  }
  @media (min-width: 768px) {
    max-width: 720px;
  }
  @media (min-width: 992px) {
    max-width: 960px;
  }
  @media (min-width: 1200px) {
    max-width: 1200px;
  }
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
`;
