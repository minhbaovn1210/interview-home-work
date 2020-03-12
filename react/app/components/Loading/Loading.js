/**
 * Loading component
 * Display a spinner to indicate background activity
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd';

import styled, { css } from 'styled-components';
import colorConfig from 'config/style';

/**
 * Display a spinner to indicate background activity
 */
export const Loading = ({
  height,
  width,
  color,
  size,
  withBlanket,
  style = {},
}) => {
  const Spinner = () => (
    <Wrapper style={style} withBlanket={withBlanket}>
      <Icon
        type="loading"
        style={{
          color,
          fontSize: size,
          zIndex: 2,
        }}
      />
    </Wrapper>
  );

  if (height) {
    return (
      <Container height={height} width={width}>
        <Spinner />
      </Container>
    );
  }

  return <Spinner />;
};

Loading.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  height: PropTypes.string,
  width: PropTypes.string,
  style: PropTypes.object,
  withBlanket: PropTypes.bool,
};

Loading.defaultProps = {
  color: colorConfig.primary,
  size: 50,
};

export default Loading;

/**
 * Styled components
 */
const Wrapper = styled.div`
  justify-content: center;
  align-items: center;
  display: flex;
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
  top: 0;
  z-index: 5;

  ${(props) =>
    props.withBlanket &&
    css`
      background-color: rgba(255, 255, 255, 0.5);
    `};
`;

const Container = styled.div`
  position: relative;

  ${(props) =>
    css`
      height: ${props.height};
      width: ${props.width};
    `};
`;
