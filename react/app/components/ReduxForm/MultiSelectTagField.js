/**
 * MultiSelectTagField using in Redux-form
 * render multi removable values
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
import MultiTag from 'components/FormElements/Select/MultiTag';

import { getMultiSelectInitialValues } from './utils';

function MultiSelectTagField({ input, meta, ...remainProps }) {
  const { onBlur, value, onFocus, ...remainInput } = input;
  const { error, touched, ...remainMeta } = meta;

  // react-select call onBlur with 1 param as param
  // but providing that param to onBlur of redux form cause error on mobile device
  const overwriteOnblur = () => {
    onBlur();
  };

  const overwriteOnFocus = () => {
    onFocus();
  };

  const { shouldChange, values } = getMultiSelectInitialValues(
    value,
    remainProps.options,
  );

  if (shouldChange) {
    setTimeout(() => {
      remainInput.onChange(values);
    }, 1);
  }

  const multiSelectProps = {
    ...remainInput,
    ...remainMeta,
    ...remainProps,
    value: values.length > 0 && !values[0].value ? [] : values,
    error: touched ? error : '',
    onBlur: overwriteOnblur,
    onFocus: overwriteOnFocus,
  };

  return <MultiTag {...multiSelectProps} />;
}

MultiSelectTagField.propTypes = {
  input: PropTypes.object, // redux-form props for Field
  meta: PropTypes.object, // redux-form props for Field
  // remainProps: remain props will be passed to Select component
};

export default MultiSelectTagField;
