/**
 * Date Picker
 * Using ant design date picker component
 * https://ant.design/components/date-picker/
 *
 * combine with
 * Label and Error component to create form element
 *
 *
 * Additional props
 *
 * @prop {bool} outlineBottom: Change style to have border bottom only
 * @prop {moment || bool (true)} disablePastDate: disable days in the before `disablePastDate`, default `disablePastDate` is today
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import Label from 'components/FormElements/Label';
import ErrorMessages from 'components/FormElements/ErrorMessages';
import FormGroup from 'components/FormElements/FormGroup';

import { CustomDatePicker, PrefixIcon } from './StyledComponents';

const isDateInThePast = (renderDay, date) =>
  renderDay && renderDay.isBefore && renderDay.isBefore(date, 'day');

const DatePicker = ({
  label,
  error,
  infoTooltip,
  isRequired,
  outlineBottom,
  disablePastDate,
  disabledDate,
  suffixIcon,
  isHavePrefix,
  dateFormat,
  ...rest
}) => {
  const checkDisabledDate = (renderDay) => {
    const isDisabled = disabledDate ? disabledDate(renderDay) : false;

    if (disablePastDate) {
      const date =
        disablePastDate && disablePastDate === true
          ? moment()
          : moment(disablePastDate, 'DD MMM YYYY');
      return isDisabled || isDateInThePast(renderDay, date);
    }

    return isDisabled;
  };

  return (
    <FormGroup>
      <Label label={label} isRequired={isRequired} infoTooltip={infoTooltip} />

      {isHavePrefix && (
        <PrefixIcon className="zmdi zmdi-calendar-note custom-date-picker-prefix" />
      )}

      <CustomDatePicker
        isHavePrefix={isHavePrefix}
        showToday={false}
        outlineBottom={outlineBottom}
        format={dateFormat || 'D/M/YYYY'}
        placeholder="DD/MM/YYYY"
        {...rest}
        error={error}
        disabledDate={checkDisabledDate}
        suffixIcon={
          suffixIcon || isHavePrefix ? (
            <i className="zmdi zmdi-chevron-down" />
          ) : null
        }
      />
      <ErrorMessages error={error} />
    </FormGroup>
  );
};

DatePicker.propTypes = {
  label: PropTypes.any,
  infoTooltip: PropTypes.string,
  dateFormat: PropTypes.string,
  error: PropTypes.string,
  isRequired: PropTypes.bool,
  outlineBottom: PropTypes.bool,
  disablePastDate: PropTypes.any, // string `DD MMM YYYY` or bool `true`
  disabledDate: PropTypes.func,
  suffixIcon: PropTypes.any,
  isHavePrefix: PropTypes.bool,
};

export default DatePicker;
