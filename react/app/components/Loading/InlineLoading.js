/**
 * InlineLoading component
 */
import React from 'react';
import styled from 'styled-components';

import Loading from './Loading';

export const ScrollFooter = styled.div`
  position: relative;
  height: 30px;
  margin: 10px 0;
  display: flex;
  justify-content: space-around;
`;

/**
 * display an inline loading
 * used to indicate loading more items in a scroll list
 */
// eslint-disable-next-line
export const InlineLoading = ({ size }) => (
  <ScrollFooter>
    <Loading size={size || 30} />
  </ScrollFooter>
);

export default InlineLoading;
