/* eslint-disable react/prop-types */
/**
 *
 * Multi Select component using as filter field
 *
 * Using react-select@^2.0.0
 * Visit https://github.com/JedWatson/react-select for documentation
 *
 */

import React from 'react';
import Select from 'components/FormElements/Select';

import { multiSelectStyle } from './selectStyle';

const multiTagStyled = {
  ...multiSelectStyle,

  valueContainer: (styles) => ({
    ...styles,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    height: 'fit-content',
  }),
};

const MultiSelect = ({ styles = {}, ...props }) => (
  <Select
    isClearable={false}
    hideSelectedOptions
    styles={{ ...multiTagStyled, ...styles }}
    closeMenuOnSelect={false}
    {...props}
    isMulti
  />
);

export default MultiSelect;
