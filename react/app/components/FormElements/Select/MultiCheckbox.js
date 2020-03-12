/* eslint-disable react/prop-types */
/* eslint-disable indent */
/**
 *
 * Multi Select component using as filter field
 *
 * Using react-select@^2.0.0
 * Visit https://github.com/JedWatson/react-select for documentation
 *
 */

import React from 'react';
import styled from 'styled-components';
import Select from 'components/FormElements/Select';

import CheckBox from 'components/FormElements/Checkbox';
import { colorConfig } from 'config/style'; // eslint-disable-line

import { multiSelectStyle } from './selectStyle';

/**
 * Hide the x close button on multi value
 * Make value scroll horizontally
 */

const MultiOption = styled.div`
  cursor: pointer;
  border-bottom: 1px ${colorConfig.borderInput} solid;
  background-color: white;
  box-shadow: none;

  :last-child {
    border: none;
  }

  :hover {
    background-color: ${colorConfig.hover};
  }
`;

const getMultiCheckboxStyle = ({ autoHeight, styles = {} }) => ({
  ...multiSelectStyle,

  multiValueRemove: () => ({ display: 'none' }),

  valueContainer: (valueContainerStyle) =>
    autoHeight
      ? valueContainerStyle
      : {
          ...valueContainerStyle,
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'nowrap',
          height: 32,
          width: 'fit-content',
          overflowX: 'auto',
          '::-webkit-scrollbar': {
            height: 0,
          },
        },
  ...styles,
});

const CustomOption = ({ data, isSelected, innerProps }) => (
  <MultiOption {...innerProps} style={{ padding: '8px 0 8px 13px' }}>
    <CheckBox type="info" labelSpace="10px" checked={isSelected} />
    {data.label}
  </MultiOption>
);

const MultiCheckbox = ({ components = {}, ...props }) => (
  <Select
    {...props}
    styles={getMultiCheckboxStyle(props)}
    isClearable={false}
    hideSelectedOptions={false}
    closeMenuOnSelect={false}
    blurInputOnSelect={false}
    components={{ Option: CustomOption, ...components }}
    isMulti
  />
);

export default MultiCheckbox;
