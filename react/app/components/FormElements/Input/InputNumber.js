/**
 * Input component
 * Using ant design Input component
 * https://ant.design/components/date-picker/
 *
 * @prop {bool} search: show search icon
 */

import React from 'react';
import PropTypes from 'prop-types';

import Label from 'components/FormElements/Label';
import ErrorMessages from 'components/FormElements/ErrorMessages';
import FormGroup from 'components/FormElements/FormGroup';

import {
  StyledInputNumber,
  SuffixWrapper,
  PrefixWrapper,
} from './StyledComponents';

const Input = ({
  label,
  error,
  isRequired,
  infoTooltip,
  isDisabled,
  search,
  suffix,
  prefix,
  ...rest
}) => (
  <FormGroup>
    <Label label={label} isRequired={isRequired} infoTooltip={infoTooltip} />
    <div style={{ position: 'relative' }}>
      {prefix && <PrefixWrapper>{prefix}</PrefixWrapper>}
      <StyledInputNumber
        prefix={prefix}
        error={!!error}
        disabled={isDisabled}
        {...rest}
      />
      {suffix && <SuffixWrapper>{suffix}</SuffixWrapper>}
    </div>
    <ErrorMessages error={error} />
  </FormGroup>
);

Input.propTypes = {
  label: PropTypes.any,
  error: PropTypes.any,
  infoTooltip: PropTypes.string,
  isRequired: PropTypes.bool,
  isDisabled: PropTypes.bool,
  search: PropTypes.bool,
  value: PropTypes.any,
  suffix: PropTypes.any,
  prefix: PropTypes.any,
};

export default Input;
