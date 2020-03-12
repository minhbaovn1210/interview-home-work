/**
 * TimePickerField for Redux-form
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import TimePicker from 'components/FormElements/TimePicker';

const TimePickerField = ({
  input,
  meta: { touched, error, ...remainMeta },
  timeFormat = 'HH:mm',
  ...remainProps
}) => {
  const { value, onChange, ...remainInput } = input;

  // init date value for antd-datepicker is `null`, not empty string as redux-form provide
  const momentValue = value !== '' ? moment(value, timeFormat) : null;

  const onChangeValue = (dateMoment, dateString) => {
    onChange(dateString);
  };

  return (
    <TimePicker
      {...remainInput}
      {...remainMeta}
      {...remainProps}
      error={(touched && error) || ''}
      onChange={onChangeValue}
      format={timeFormat}
      value={momentValue}
    />
  );
};

TimePickerField.propTypes = {
  input: PropTypes.object, // redux-form props for Field
  meta: PropTypes.object, // redux-form props for Field
  timeFormat: PropTypes.string,
  // remainProps: remain props will be passed to Input component
};

export default TimePickerField;
