/**
 * Time Picker
 * Using ant design time picker component
 * https://ant.design/components/time-picker
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { TimePicker } from 'antd';

import { colorConfig } from 'config/style';
import Label from 'components/FormElements/Label';
import ErrorMessages from 'components/FormElements/ErrorMessages';
import FormGroup from 'components/FormElements/FormGroup';

const CustomTimePicker = styled(TimePicker)`
  width: 100%;

  :hover {
    .ant-time-picker-input {
      border: 1px solid ${colorConfig.active};
    }
  }
  :focus {
    .ant-time-picker-input {
      box-shadow: 0 0 0 2px ${colorConfig.error}20;
    }
  }

  ${(props) =>
    props.error &&
    css`
      .ant-time-picker-input {
        border-color: ${colorConfig.error} !important;
      }
    `};
`;

const TimePickerElement = ({
  label,
  error,
  infoTooltip,
  isRequired,
  suffixIcon,
  ...rest
}) => (
  <FormGroup>
    <Label label={label} isRequired={isRequired} infoTooltip={infoTooltip} />

    <CustomTimePicker
      showToday={false}
      format="HH:mm"
      {...rest}
      error={error}
      suffixIcon={suffixIcon}
    />
    <ErrorMessages error={error} />
  </FormGroup>
);

TimePickerElement.propTypes = {
  label: PropTypes.any,
  infoTooltip: PropTypes.string,
  error: PropTypes.string,
  isRequired: PropTypes.bool,
  suffixIcon: PropTypes.any,
};

export default TimePickerElement;
