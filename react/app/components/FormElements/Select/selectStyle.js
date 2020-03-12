import { colorConfig } from 'config/style';

const getBorderColor = (error, isFocused) => {
  if (error) return colorConfig.error;

  return isFocused ? colorConfig.darkPrimary : colorConfig.borderInput;
};

const getShadowColor = (error, isFocused, outlineBottom) => {
  if (outlineBottom) return 'none !important';
  if (isFocused && error) return `0 0 0 2px ${colorConfig.error}20 !important`;
  if (isFocused && !error) return `0 0 0 2px ${colorConfig.darkPrimary}20`;

  return '';
};

// Style react-select with `styles` props
export const getSelectStyle = (
  error,
  outlineBottom,
  optionWidth = 'none',
  isSearchable,
) => ({
  valueContainer: (styles) => ({
    ...styles,
    overflowX: 'auto',
    '::-webkit-scrollbar': {
      height: 0,
    },
    padding: outlineBottom ? '0' : '2px 8px',
    color: colorConfig.text,
    fontWeight: 400,
  }),

  control: (styles, { isFocused, isDisabled }) => ({
    ...styles,
    backgroundColor: isDisabled ? colorConfig.disabled : 'transparent',
    border: outlineBottom ? 0 : `1px solid ${getBorderColor(error, isFocused)}`,
    boxShadow: getShadowColor(error, isFocused, outlineBottom),
    ':hover': {
      borderColor: error ? colorConfig.error : colorConfig.darkPrimary,
      cursor: isSearchable ? 'text' : 'pointer',
    },
    minHeight: outlineBottom ? 33 : 40,
    borderBottom: `1px solid ${getBorderColor(error, isFocused)}`,
    borderRadius: outlineBottom ? 0 : '4px',
  }),

  option: (styles, { isFocused, isSelected }) => ({
    ...styles,
    backgroundColor: isSelected ? 'white' : isFocused && colorConfig.hover,
    ':active': { backgroundColor: colorConfig.hover },
    color: isSelected ? colorConfig.linkColor : colorConfig.text,
    fontWeight: 400,
    borderBottom: outlineBottom
      ? 'none'
      : `1px ${colorConfig.borderInput} solid`,
    ':last-child': { border: 0 },
    cursor: 'pointer',
    lineHeight: '21px',
    fontSize: 14,
  }),

  indicatorSeparator: () => ({}),

  menu: (styles) => ({
    ...styles,
    minWidth: optionWidth || '200px',
    marginTop: 4,
    zIndex: 3,
  }),

  placeholder: (styles) => ({
    ...styles,
    color: colorConfig.placeHolder,
    lineHeight: '14px',
    whiteSpace: 'nowrap',
  }),

  multiValueRemove: (styles) => ({
    ...styles,
    ':hover': {
      color: 'white',
      backgroundColor: colorConfig.danger,
    },
    fontSize: '14px',
    cursor: 'pointer',
  }),

  dropdownIndicator: (style) => ({
    ...style,
    color: `${colorConfig.borderInput} !important`,
  }),

  singleValue: (style) => ({
    ...style,
    overflow: 'visible',
  }),
});

export const multiSelectStyle = {
  option: (styles, { isFocused, isSelected }) => ({
    ...styles,
    backgroundColor: isSelected
      ? colorConfig.darkPrimary
      : isFocused && colorConfig.hover,
    ':active': { backgroundColor: colorConfig.darkPrimary, color: 'white' },
    color: isSelected && 'white',
    borderBottom: `1px ${colorConfig.borderInput} solid`,
    ':last-child': { border: 0 },
  }),

  multiValue: (style) => ({
    ...style,
    minWidth: 'none',
  }),
};

export default getSelectStyle;
