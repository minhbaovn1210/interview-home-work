import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { compose, bindActionCreators } from 'redux';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { notification, Button } from 'antd';
import _get from 'lodash/get';
import { createStructuredSelector } from 'reselect';

import globalMessages from 'containers/App/messages';
import formatMessage from 'containers/LanguageProvider/formatMessage';
import Typography from 'components/Typography';
import { InputField, DatePickerField } from 'components/ReduxForm';
import FormAlert from 'containers/PublicPages/components/FormAlert';
import routes from 'config/routes';
import { editUserProfileAction } from 'containers/App/actions';
import { makeSelectUserProfile } from 'containers/App/selectors';

import { FormWrapper, ActionContainer } from './StyledComponents';
import formValidators from './formValidators';
import { fields } from './constants';

export function EditUserProfile({
  submitEditUserProfile,
  submitting,
  handleSubmit,
}) {
  const [errorMessage, setErrorMessage] = useState('');
  const [isOpenChangePassword, setIsOpenChangePassword] = useState(false);

  const onClickSubmitEditUserProfile = values =>
    new Promise((onSuccess, onFail) => {
      submitEditUserProfile({ ...values }, { onSuccess, onFail });
    })
      .then(() => {
        setIsOpenChangePassword(false);
        notification.success({
          message: formatMessage(globalMessages.success),
        });
      })
      .catch(error => {
        notification.destroy();
        setErrorMessage(error.message);

        setTimeout(() => setErrorMessage(''), 3000);
      });

  return (
    <>
      <Helmet>
        <title>{formatMessage(globalMessages.userProfile)}</title>
      </Helmet>

      <Typography
        label={formatMessage(globalMessages.userProfile)}
        type="heading1"
        style={{ display: 'flex', justifyContent: 'center' }}
      />

      <FormWrapper>
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

        {!isOpenChangePassword && (
          <a href="#" onClick={() => setIsOpenChangePassword(true)}>
            {formatMessage(globalMessages.changePassword)}
          </a>
        )}

        {isOpenChangePassword && (
          <>
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
          </>
        )}

        {errorMessage && <FormAlert message={errorMessage} error />}

        <ActionContainer>
          <Button
            type="primary"
            onClick={handleSubmit(onClickSubmitEditUserProfile)}
            disabled={submitting}
          >
            {formatMessage(globalMessages.save)}
          </Button>
        </ActionContainer>
      </FormWrapper>
    </>
  );
}

EditUserProfile.propTypes = {
  submitting: PropTypes.bool,
  handleSubmit: PropTypes.func,
  submitEditUserProfile: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  initialValues: makeSelectUserProfile(),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { submitEditUserProfile: editUserProfileAction },
    dispatch,
  );

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReduxForm = reduxForm({
  form: 'EDIT_USER_FORM',
  validate: formValidators,
  enableReinitialize: true,
});

export default compose(
  withConnect,
  withReduxForm,
  memo,
)(EditUserProfile);
