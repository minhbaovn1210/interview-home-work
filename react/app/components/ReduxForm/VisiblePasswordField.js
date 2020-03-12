import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { Icon } from 'antd';
import styled, { css } from 'styled-components';

import { formatMessage } from 'containers/LanguageProvider/IntlGlobalProvider';
import globalMessages from 'containers/App/messages';

import InputField from './InputField';

const Wrapper = styled.div`
  position: relative;

  ${props =>
    props.isHiddenError &&
    css`
      min-height: 140px;
    `}
`;

export const ErrorContainer = styled.div`
  padding: 12px;
  background-color: rgba(233, 233, 233, 0.3);
  margin-top: 8px;
  line-height: 24px;
  width: 100%;
  position: absolute;
`;

let filterTimeout;

export function VisiblePasswordField(props) {
  const [showPassword, setViewPassword] = useState(false);
  const [firstError, setFirstError] = useState(true);
  const [secondError, setSecondError] = useState(true);

  const onHandleChange = value => {
    clearTimeout(filterTimeout);

    filterTimeout = setTimeout(() => {
      setFirstError(value.length < 6);
    }, 100);
  };

  return (
    <Wrapper isHiddenError={props.isHiddenError}>
      <Field
        component={InputField}
        isRequired
        type={showPassword ? undefined : 'password'}
        suffix={
          <Icon
            type={`eye${showPassword ? '' : '-invisible'}`}
            onClick={() => setViewPassword(!showPassword)}
          />
        }
        onHandleChange={onHandleChange}
        {...props}
      />

      {props.isHiddenError && (
        <ErrorContainer>
          <div>
            <i
              className={
                firstError ? 'zmdi zmdi-circle-o' : 'zmdi zmdi-check-circle'
              }
            />
            &nbsp; {formatMessage(globalMessages.atLeast6Character)}
          </div>

          <div>
            <i
              className={
                secondError ? 'zmdi zmdi-circle-o' : 'zmdi zmdi-check-circle'
              }
            />
            &nbsp;{' '}
            {formatMessage(globalMessages.mustHaveAtLeast1LetterAnd1Number)}
          </div>
        </ErrorContainer>
      )}
    </Wrapper>
  );
}

VisiblePasswordField.propTypes = {
  isHiddenError: PropTypes.bool, // If false => Use render error of input component
};

VisiblePasswordField.defaultProps = {
  isHiddenError: true,
};

export default VisiblePasswordField;
