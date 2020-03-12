import React from 'react';
import PropTypes from 'prop-types';
import { FormAlertWrapper, AlertContent } from './StyledComponents';

const FormAlert = ({ message, style, ...rest }) => (
  <FormAlertWrapper style={style}>
    <AlertContent {...rest}>{message}</AlertContent>
  </FormAlertWrapper>
);

FormAlert.propTypes = {
  message: PropTypes.string,
  style: PropTypes.object,
};

export default FormAlert;
