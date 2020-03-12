/**
 * Red error message display below form field when has error
 */

import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import uuid from 'uuid';

import { colorConfig } from 'config/style';

export const RedText = styled.div`
  font-size: 12px;
  min-height: 17px;
  line-height: 17px;
  margin-top: 5px;
  color: ${colorConfig.error};
  font-weight: 400;
`;

const ErrorMessages = ({ error, ...rest }) => (
  <RedText key={uuid()} className="error-message" {...rest}>
    {error}
  </RedText>
);

ErrorMessages.propTypes = {
  error: PropTypes.any,
  getErrors: PropTypes.func,
};

export default ErrorMessages;
