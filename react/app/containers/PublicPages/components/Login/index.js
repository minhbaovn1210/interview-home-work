import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { compose, bindActionCreators } from 'redux';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { notification, Button } from 'antd';
import _get from 'lodash/get';

import globalMessages from 'containers/App/messages';
import formatMessage from 'containers/LanguageProvider/formatMessage';
import Typography from 'components/Typography';
import { InputField } from 'components/ReduxForm';
import routes from 'config/routes';
import { logInAction, getUserInfoAction } from 'containers/App/actions';

import FormAlert from '../FormAlert';
import { FormWrapper, ActionContainer } from './StyledComponents';
import formValidators from './formValidators';
import { fields } from './constants';

export function Login({ submitLogin, submitting, handleSubmit, getUserInfo }) {
  const [errorMessage, setErrorMessage] = useState();

  useEffect(() => {
    // For multiple tab login
    const watchingToken = setInterval(() => {
      const state = JSON.parse(localStorage.getItem('ws_state'));

      if (_get(state, 'global.token.accessToken')) {
        window.location.reload();
      }
    }, 1000);
    return () => {
      clearInterval(watchingToken);
    };
  }, []);

  const onClickSubmitLogin = values =>
    new Promise((onSuccess, onFail) => {
      submitLogin({ ...values }, { onSuccess, onFail });
    })
      .then(payload => {
        getUserInfo(payload.accessToken);
      })
      .catch(error => {
        notification.destroy();
        setErrorMessage(error.message);

        setTimeout(() => setErrorMessage(''), 3000);
      });

  return (
    <>
      <Helmet>
        <title>{formatMessage(globalMessages.login)}</title>
      </Helmet>

      <Typography
        label={formatMessage(globalMessages.login)}
        type="heading1"
        style={{ display: 'flex', justifyContent: 'center' }}
      />

      <FormWrapper>
        <Field
          label={formatMessage(globalMessages.username)}
          name={fields.USERNAME}
          component={InputField}
          placeholder={formatMessage(globalMessages.username)}
          onPressEnter={handleSubmit(onClickSubmitLogin)}
          disabled={submitting}
        />

        <Field
          label={formatMessage(globalMessages.password)}
          name={fields.PASSWORD}
          component={InputField}
          placeholder={formatMessage(globalMessages.password)}
          onPressEnter={handleSubmit(onClickSubmitLogin)}
          disabled={submitting}
          type="password"
        />

        {errorMessage && <FormAlert message={errorMessage} error />}

        <ActionContainer>
          <Button
            type="primary"
            onClick={handleSubmit(onClickSubmitLogin)}
            disabled={submitting}
          >
            {formatMessage(globalMessages.login)}
          </Button>
        </ActionContainer>
      </FormWrapper>
    </>
  );
}

Login.propTypes = {
  submitting: PropTypes.bool,
  handleSubmit: PropTypes.func,
  submitLogin: PropTypes.func,
  getUserInfo: PropTypes.func,
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { submitLogin: logInAction, getUserInfo: getUserInfoAction },
    dispatch,
  );

const withConnect = connect(
  null,
  mapDispatchToProps,
);

const withReduxForm = reduxForm({
  form: 'LOGIN_FORM',
  validate: formValidators,
  enableReinitialize: true,
});

export default compose(
  withConnect,
  withReduxForm,
  memo,
)(Login);
