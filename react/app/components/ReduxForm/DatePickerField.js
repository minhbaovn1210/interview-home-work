/**
 * Date Picker using in Redux-form
 *
 * value: (string) formated value as string
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import DatePicker from 'components/FormElements/DatePicker';

const DatePickerField = ({
  input,
  meta: { touched, error, ...remainMeta },
  outlineBottom,
  onChangeDate, // callback on change with moment.js value
  ...remainProps
}) => {
  const { value, onChange } = input;
  const dateFormat = remainProps.dateFormat || remainProps.format || 'D/M/YYYY';

  // init date value for antd-datepicker is `null`, not empty string as redux-form provide
  let momentValue = null;

  if (value !== '') {
    momentValue = moment(value, dateFormat);
    momentValue = momentValue.isValid() ? momentValue : null;
  } else {
    momentValue = null;
  }

  const onChangeValue = (dateMoment) => {
    if (onChangeDate) {
      onChangeDate(dateMoment);
    }

    onChange(dateMoment ? dateMoment.format(dateFormat) : '');
  };

  return (
    <DatePicker
      {...remainMeta}
      {...remainProps}
      error={(touched && error) || ''}
      onChange={onChangeValue}
      value={momentValue}
      outlineBottom={outlineBottom}
    />
  );
};

DatePickerField.propTypes = {
  input: PropTypes.object, // redux-form props for Field
  meta: PropTypes.object, // redux-form props for Field
  dateFormat: PropTypes.string,
  outlineBottom: PropTypes.bool,
  onChangeDate: PropTypes.func,
  // remainProps: remain props will be passed to Checkbox component
};

export default DatePickerField;
