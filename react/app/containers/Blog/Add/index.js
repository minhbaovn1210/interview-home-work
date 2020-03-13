/* eslint-disable react/prefer-stateless-function */
/**
 *
 * AddBlog
 *
 */

import React, { useEffect, memo, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';
import { Helmet } from 'react-helmet';
import { Button, notification } from 'antd';
import { reduxForm, Field } from 'redux-form';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import formatMessage from 'containers/LanguageProvider/formatMessage';
import globalMessages from 'containers/App/messages';
import routes from 'config/routes';

import { FieldRow, FieldCol } from 'components/Layout';
import {
  TinyMceField,
  InputField,
  MultiSelectTagField,
} from 'components/ReduxForm';
import Typography from 'components/Typography';
import { ActionContainer } from 'containers/EditUserProfile/StyledComponents';

import { Wrapper } from './StyledComponents';
import { fields } from './constants';
import { submitAddBlog } from './actions';
import saga from './saga';
import reducer from './reducer';
import formValidators from './formValidators';

const AddBlog = ({
  submitAddBlog,
  history,
  handleSubmit,
  submitting,
  invalid,
}) => {
  const [content, setContent] = useState('');

  useInjectSaga({ key: 'BLOG_ADD_EDIT', saga });
  useInjectReducer({ key: 'BLOG_ADD_EDIT', reducer });

  const onClickSubmitAddEditBlog = values =>
    new Promise((resolve, onFail) => {
      submitAddBlog(
        { ...values, content },
        {
          onSuccess: () => {
            notification.success({
              message: formatMessage(globalMessages.success),
            });
            history.push('/');
            resolve();
          },
          onFail,
        },
      );
    }).then(() => {});

  const onEditorChange = values => {
    setContent(values);
  };

  return (
    <Wrapper>
      <Helmet>
        <title>{formatMessage(globalMessages.addBlog)} </title>
      </Helmet>

      <Typography
        label={formatMessage(globalMessages.addBlog)}
        type="heading1"
        style={{ display: 'flex', justifyContent: 'center' }}
      />

      <FieldRow>
        <FieldCol md={8}>
          <Field
            label={formatMessage(globalMessages.title)}
            name={fields.TITLE}
            component={InputField}
            placeholder={formatMessage(globalMessages.title)}
            isRequired
          />
        </FieldCol>

        <FieldCol md={8}>
          <Field
            label={formatMessage(globalMessages.tags)}
            name={fields.TAGS}
            component={MultiSelectTagField}
            placeholder={formatMessage(globalMessages.tags)}
            isCreatable
          />
        </FieldCol>

        <FieldCol md={24}>
          <Field
            label={formatMessage(globalMessages.content)}
            name={fields.CONTENT}
            component={TinyMceField}
            onEditorChange={onEditorChange}
            isRequired
          />
        </FieldCol>
      </FieldRow>

      <ActionContainer>
        <Button
          type="primary"
          onClick={handleSubmit(onClickSubmitAddEditBlog)}
          disabled={invalid || content.length === 0 || submitting}
        >
          {formatMessage(globalMessages.add)}
        </Button>
      </ActionContainer>
    </Wrapper>
  );
};

AddBlog.propTypes = {
  submitAddBlog: PropTypes.func,
  submitting: PropTypes.bool,
  handleSubmit: PropTypes.func,
  history: PropTypes.object,
  invalid: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      submitAddBlog,
    },
    dispatch,
  );

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReduxForm = reduxForm({
  form: 'ADD_EDIT_BLOG_FORM',
  validate: formValidators,
  enableReinitialize: true,
});

export default compose(
  withConnect,
  withReduxForm,
  memo,
)(AddBlog);
