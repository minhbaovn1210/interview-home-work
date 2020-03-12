// Get list values of selected options; [{value: 1, label: '1'},...] => [1, ...]
export const getMultiSelectedValues = (selectedOptions) =>
  (selectedOptions || []).map((option) => {
    const optionValue = option.value || option;

    if (
      !isNaN(parseInt(optionValue, 10)) // eslint-disable-line
    ) {
      return parseInt(optionValue, 10);
    }

    return optionValue;
  });

/**
 * Get initial value of multi-select
 * Supply [value]  as initial values -> return [{value, label}]
 * label, value are get from `options` prop
 *
 * return {
 *  shouldChange -> should change initial values or not
 *  values -> new initial values
 * }
 */
export const getMultiSelectInitialValues = (value, options = []) => {
  const selectedOptions = value;

  if (
    Array.isArray(selectedOptions) &&
    selectedOptions.length > 0 &&
    !selectedOptions[0].value &&
    options.length > 0
  ) {
    const selectedOptionValues = getMultiSelectedValues(selectedOptions);
    const toSelectOptions = (options || []).filter((option) =>
      selectedOptionValues.includes(option.value),
    );

    const selectedDiff = getMultiSelectedValues(toSelectOptions).filter(
      (v) => !selectedOptionValues.includes(v),
    );

    if (
      selectedDiff.length > 0 ||
      (selectedOptions.length > 0 && !selectedOptions[0].value)
    ) {
      return { shouldChange: true, values: toSelectOptions };
    }
  }

  return { shouldChange: false, values: selectedOptions };
};
