/**
 * Checkbox
 * Using ant design Checkbox component
 * https://ant.design/components/checkbox/
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox as AntdCheckBox } from 'antd';

import ErrorMessages from 'components/FormElements/ErrorMessages';

const Checkbox = ({ label, children, touched, error, ...remain }) => (
  <AntdCheckBox {...remain}>
    {label}
    {children}
    {touched && error && (
      <ErrorMessages error={error} style={{ paddingLeft: 24 }} />
    )}
  </AntdCheckBox>
);

Checkbox.propTypes = {
  children: PropTypes.any,
  label: PropTypes.any,
  touched: PropTypes.bool,
  error: PropTypes.string,
};

export default Checkbox;
