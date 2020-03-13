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
import { InputField, DatePickerField } from 'components/ReduxForm';
import routes from 'config/routes';
import { registerAction, getUserInfoAction } from 'containers/App/actions';

import FormAlert from '../FormAlert';
import { FormWrapper, ActionContainer } from './StyledComponents';
import formValidators from './formValidators';
import { fields } from './constants';

export function Login({
  submitRegister,
  submitting,
  handleSubmit,
  getUserInfo,
}) {
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // For multiple tab login
    const watchingToken = setInterval(() => {
      const state = JSON.parse(localStorage.getItem('blog_state'));

      if (_get(state, 'global.token.accessToken')) {
        window.location.reload();
      }
    }, 1000);
    return () => {
      clearInterval(watchingToken);
    };
  }, []);

  const onClickSubmitRegister = values =>
    new Promise((onSuccess, onFail) => {
      submitRegister({ ...values }, { onSuccess, onFail });
    })
      .then(payload => {
        getUserInfo(payload.accessToken);
      })
      .catch(error => {
        notification.destroy();
        if (error.message.includes('duplicate key')) {
          setErrorMessage(formatMessage(globalMessages.usernameHaveExisted));
        } else {
          setErrorMessage(error.message);
        }

        setTimeout(() => setErrorMessage(''), 3000);
      });

  return (
    <>
      <Helmet>
        <title>{formatMessage(globalMessages.register)}</title>
      </Helmet>

      <Typography
        label={formatMessage(globalMessages.register)}
        type="heading1"
        style={{ display: 'flex', justifyContent: 'center' }}
      />

      <FormWrapper>
        <Field
          label={formatMessage(globalMessages.username)}
          name={fields.USERNAME}
          component={InputField}
          placeholder={formatMessage(globalMessages.username)}
          disabled={submitting}
          isRequired
        />

        <Field
          label={formatMessage(globalMessages.password)}
          name={fields.PASSWORD}
          component={InputField}
          placeholder={formatMessage(globalMessages.password)}
          disabled={submitting}
          type="password"
          isRequired
        />

        <Field
          label={formatMessage(globalMessages.rePassword)}
          name={fields.RE_PASSWORD}
          component={InputField}
          placeholder={formatMessage(globalMessages.rePassword)}
          disabled={submitting}
          type="password"
          isRequired
        />

        <Field
          label={formatMessage(globalMessages.name)}
          name={fields.NAME}
          component={InputField}
          placeholder={formatMessage(globalMessages.name)}
          disabled={submitting}
          isRequired
        />

        <Field
          label={formatMessage(globalMessages.dob)}
          name={fields.DOB}
          component={DatePickerField}
          placeholder={formatMessage(globalMessages.dob)}
          disabled={submitting}
          isRequired
        />

        {errorMessage && <FormAlert message={errorMessage} error />}

        <ActionContainer>
          <Button
            type="primary"
            onClick={handleSubmit(onClickSubmitRegister)}
            disabled={submitting}
          >
            {formatMessage(globalMessages.register)}
          </Button>
        </ActionContainer>
      </FormWrapper>
    </>
  );
}

Login.propTypes = {
  submitting: PropTypes.bool,
  handleSubmit: PropTypes.func,
  submitRegister: PropTypes.func,
  getUserInfo: PropTypes.func,
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { submitRegister: registerAction, getUserInfo: getUserInfoAction },
    dispatch,
  );

const withConnect = connect(
  null,
  mapDispatchToProps,
);

const withReduxForm = reduxForm({
  form: 'REGISTER_FORM',
  validate: formValidators,
  enableReinitialize: true,
});

export default compose(
  withConnect,
  withReduxForm,
  memo,
)(Login);
