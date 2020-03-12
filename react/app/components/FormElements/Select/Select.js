/**
 *
 * Select component - select single option
 *
 * Using react-select@^2.0.0
 * Visit https://github.com/JedWatson/react-select for documentation
 *
 * @prop {string} label: label of select box when use as a form element
 * @prop {string} error: error message to display
 * @prop {bool} isRequired: show required mark next to label when use as a form element (see <Input>)
 * @prop {bool} isLoading: show `loading...` instead of `No data`
 * @prop {array} options: list select option for `react-select`
 * @prop {string} noDataText: custome text to display when select has no option
 *
 * @prop {bool} isCreatable: render creatable select
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import Creatable from 'react-select/lib/Creatable';

import formatMessage from 'containers/LanguageProvider/formatMessage';
import globalMessages from 'containers/App/messages';

import Label from 'components/FormElements/Label';
import ErrorMessages from 'components/FormElements/ErrorMessages';
import FormGroup from 'components/FormElements/FormGroup';

import { ClearIconIndicator } from './components';
import { getSelectStyle } from './selectStyle';

const SelectBox = ({
  placeholder,
  label,
  isRequired,
  noOptionsMessage,
  loadingMessage,
  infoTooltip,
  error,
  outlineBottom,
  optionWidth,
  components = {},
  isCreatable,
  options = [],
  isSearchable = true,
  ...remainProps
}) => {
  const selectProps = {
    options,
    placeholder: placeholder || formatMessage(globalMessages.selectPlaceHolder),
    noOptionsMessage: () =>
      noOptionsMessage ||
      formatMessage(
        options.length === 0 ? globalMessages.noData : globalMessages.notFound,
      ),
    loadingMessage: () =>
      loadingMessage || formatMessage(globalMessages.loading),
    components: {
      DropdownIndicator: () => (
        <i
          className="zmdi zmdi-chevron-down"
          style={{ padding: outlineBottom ? 0 : '0 10px' }}
        />
      ),
      ClearIndicator: ClearIconIndicator,
      ...components,
    },
    isSearchable,

    ...remainProps,
    /**
     * NOTE:
     * Keep `styles` prop at the end of list props to overwrite default style of `react-select`
     * with custom style above add custom style for each usage
     */
    styles: {
      ...getSelectStyle(error, outlineBottom, optionWidth, isSearchable),
      ...remainProps.styles,
    },
    classNamePrefix: 'react-select',
  };

  return (
    <FormGroup>
      <Label label={label} isRequired={isRequired} infoTooltip={infoTooltip} />

      {isCreatable ? (
        <Creatable {...selectProps} />
      ) : (
        <Select {...selectProps} />
      )}

      <ErrorMessages error={error} />
    </FormGroup>
  );
};

SelectBox.propTypes = {
  label: PropTypes.any,
  noOptionsMessage: PropTypes.string,
  loadingMessage: PropTypes.string,
  infoTooltip: PropTypes.string,
  placeholder: PropTypes.string,
  error: PropTypes.any,
  isRequired: PropTypes.bool,
  outlineBottom: PropTypes.bool,
  optionWidth: PropTypes.string,
  components: PropTypes.object,
  options: PropTypes.array,
  isSearchable: PropTypes.bool,

  isCreatable: PropTypes.bool,
};

SelectBox.defaultProps = {
  components: {},
};

export default SelectBox;
