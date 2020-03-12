/**
 * TextArea component
 * Using ant design Input component
 * https://ant.design/components/input/
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import Label from 'components/FormElements/Label';
import ErrorMessages from 'components/FormElements/ErrorMessages';
import FormGroup from 'components/FormElements/FormGroup';
import formatMessage from 'containers/LanguageProvider/formatMessage';
import globalMessages from 'containers/App/messages';

import { StyledTextArea } from './StyledComponents';

const DatePicker = ({ label, error, infoTooltip, isRequired, ...rest }) => (
  <FormGroup>
    <Label label={label} isRequired={isRequired} infoTooltip={infoTooltip} />
    <StyledTextArea
      type="text"
      error={error}
      placeholder={formatMessage(globalMessages.typeHere)}
      autosize={{ minRows: 3, maxRows: 6 }}
      {...rest}
    />
    <ErrorMessages error={error} />
  </FormGroup>
);

DatePicker.propTypes = {
  label: PropTypes.any,
  error: PropTypes.string,
  infoTooltip: PropTypes.string,
  isRequired: PropTypes.bool,
};

export default DatePicker;
