/**
 * Single Select using in Redux-form
 *
 * value: {
 *   label: (string)
 *   value: (string)
 *   ...and other data
 * }
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import Select from 'components/FormElements/Select';

function SelectField({ input, meta, ...remainProps }) {
  const { onBlur, onFocus, value, ...remainInput } = input;
  const { error, touched, ...remainMeta } = meta;

  let selectedOption = value;

  if (parseInt(selectedOption, 10)) {
    selectedOption = parseInt(selectedOption, 10);
  }

  if (
    typeof selectedOption === 'number' ||
    typeof selectedOption === 'string' ||
    Object.keys(selectedOption).length === 1
  ) {
    // when init value for SelectField, we only need to provide `value` key
    // `label` and other data will be extract from `options` props
    const toSelectOption = (remainProps.options || []).find(
      (option) =>
        option.value === selectedOption ||
        option.value === selectedOption.value,
    );

    if (
      toSelectOption &&
      (toSelectOption.value !== selectedOption.value ||
        toSelectOption.label !== selectedOption.label)
    ) {
      setTimeout(() => {
        remainInput.onChange(toSelectOption);
      }, 1);
    }
  }

  // react-select call onBlur with 1 param as param
  // but providing that param to onBlur of redux form cause error on mobile device
  const overwriteOnblur = () => {
    onBlur();
  };

  const overwriteOnFocus = () => {
    onFocus();
  };

  // if user clear value by press delete/backspace, value provided by react-select is array
  if (selectedOption && selectedOption.length === 0) {
    setTimeout(() => remainInput.onChange(null), 0);
  }

  return (
    <Select
      {...remainInput}
      {...remainMeta}
      {...remainProps}
      value={selectedOption}
      error={touched ? error : ''}
      onBlur={overwriteOnblur}
      onFocus={overwriteOnFocus}
    />
  );
}

SelectField.propTypes = {
  input: PropTypes.object, // redux-form props for Field
  meta: PropTypes.object, // redux-form props for Field
  // remainProps: remain props will be passed to Select component
};

export default SelectField;
