/**
 *
 * Typography Component
 * Render text as header, title, subTitle,subHeader,... with different size and color.
 * Font size is responsive to view port
 *
 * @prop {string} label: text to be display
 * @prop {object/array} children
 * @prop {bool} bottomLine: add bottom line
 * @prop {string} type: one of heading1 -> heading6
 *
 * @prop {string} theme: color of text (key in colorConfig)
 * @prop {string} color: color of text (any valid color)
 *
 * @prop {bool} bold: make text bold
 * @prop {bool} uppercase: make text uppercase
 * @prop {bool} textCenter: make text center
 * @prop {bool} noMargin: remove default margin top 20px and margin bottom 20px
 * @prop {bool} noMarginTop:
 */

/* eslint-disable indent */

import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { colorConfig } from 'config/style';

const Wrapper = styled.div`
  font-size: 16px;
  display: flex;
  justify-content: space-between;
  padding: 0;
  align-items: center;
  color: ${colorConfig.text};
  position: relative;
  font-weight: 600;
  word-break: break-word;

  ${(props) =>
    props.margin &&
    css`
      margin: ${props.margin};
    `};

  ${(props) =>
    props.uppercase &&
    css`
      text-transform: uppercase;
    `};

  ${(props) =>
    props.textCenter &&
    css`
      justify-content: center;
      text-align: center;
    `};

  ${(props) =>
    props.bottomLine &&
    css`
      border-bottom: 1px ${colorConfig.borderInput} solid;
      padding-bottom: 5px;
    `};

  ${(props) =>
    props.bottomLineFlow &&
    css`
      border-bottom: 1px ${colorConfig.borderInput} solid;
      padding: 16px 24px;
      margin: 0
        ${props.bottomLineFlow === true ? '-24px' : props.bottomLineFlow};
      margin-bottom: 24px;
    `};

  ${(props) => {
    const color = props.color || colorConfig[props.theme] || '#212121';

    return (
      (props.theme || props.color) &&
      css`
        color: ${color};

        a {
          color: ${color} !important;
        }
      `
    );
  }};

  ${(props) =>
    props.noMargin &&
    css`
      margin: 0;
    `};

  ${(props) =>
    props.noMarginTop &&
    css`
      margin-top: 0;
    `};

  ${(props) =>
    props.fullWidth &&
    css`
      width: 100%;
    `};

  ${(props) => {
    const style = getStyleByType(props.type);

    return css`
      ${style.base};

      @media (max-width: 425px) {
        ${style.sm};
      }
      @media (min-width: 768px) {
        ${style.md};
      }
      @media (min-width: 992px) {
        ${style.lg};
      }
      @media (min-width: 1200px) {
        ${style.xl};
      }
    `;
  }};
`;

function getStyleByType(type) {
  // must provide all value for lg, md,sm for Typography to work responsively
  const style = {
    base: css``,
    sm: css``,
    md: css``,
    lg: css``,
    xl: css``,
  };

  switch (type) {
    case 'heading1':
      style.base = css`
        font-size: 32px;
      `;
      break;

    case 'heading2':
      style.base = css`
        font-size: 24px;
      `;
      break;

    case 'heading3':
      style.base = css`
        font-size: 20px;
      `;
      style.sm = css`
        font-size: 17px;
      `;
      style.md = css`
        font-size: 20px;
      `;
      break;

    case 'heading4':
      style.base = css`
        font-size: 16px;
      `;
      break;

    case 'heading5':
      style.base = css`
        font-size: 14px;
        font-weight: 500;
      `;
      break;
    case 'heading6':
      style.base = css`
        font-size: 12px;
        font-weight: 500;
      `;
      break;
    default:
      break;
  }

  return style;
}

function Typography({ label, children, ...rest }) {
  return (
    <Wrapper {...rest}>
      {label}
      {children}
    </Wrapper>
  );
}

Typography.propTypes = {
  label: PropTypes.any,
  children: PropTypes.any,
  bottomLine: PropTypes.bool,
  bottomLineFlow: PropTypes.any,
  type: PropTypes.string,
  theme: PropTypes.string,
  bold: PropTypes.bool,
  margin: PropTypes.string,
  noMargin: PropTypes.bool,
  noBorder: PropTypes.bool,
  uppercase: PropTypes.bool,
  fullWidth: PropTypes.bool,
  color: PropTypes.string,
};

Typography.defaultProps = {
  bottomLine: false,
  uppercase: false,
  bold: false,
  margin: '20px 0',
  noMargin: false,
  fullWidth: false,
  type: 'title',
  theme: 'text', // color config key
};

export default Typography;
