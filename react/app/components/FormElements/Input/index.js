/**
 * Input component
 * Using ant design Input component
 * https://ant.design/components/date-picker/
 *
 * @prop {bool} search: show search icon
 */

import React from 'react';
import PropTypes from 'prop-types';
import { SearchOutlined } from '@ant-design/icons';

import Label from 'components/FormElements/Label';
import ErrorMessages from 'components/FormElements/ErrorMessages';
import FormGroup from 'components/FormElements/FormGroup';
import formatMessage from 'containers/LanguageProvider/formatMessage';
import globalMessages from 'containers/App/messages';

import StyledInput from './StyledComponents';

const Input = ({
  label,
  error,
  isRequired,
  infoTooltip,
  isDisabled,
  search,
  isHiddenError,
  ...rest
}) => (
  <FormGroup>
    <Label label={label} isRequired={isRequired} infoTooltip={infoTooltip} />
    <StyledInput
      error={!isHiddenError && !!error}
      type="text"
      disabled={isDisabled}
      placeholder={formatMessage(globalMessages.typeHere)}
      suffix={search ? <SearchOutlined /> : undefined}
      {...rest}
    />
    {!isHiddenError && <ErrorMessages error={error} />}
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
  isHiddenError: PropTypes.bool,
};

export default Input;
