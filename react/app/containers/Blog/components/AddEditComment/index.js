import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';
import { Field, reduxForm } from 'redux-form/immutable';
import { Button } from 'antd';

import { TextAreaField } from 'components/ReduxForm';
import Avatar from 'components/Avatar';
import { makeSelectUserAvatar } from 'containers/App/selectors';
import formatMessage from 'containers/LanguageProvider/formatMessage';
import messages from 'containers/WeHub/components/messages';
import {
  CommentContainer,
  ContentContainer,
} from 'containers/WeHub/components/CommentItem/StyledComponents';
import { PostingBlanket } from 'containers/WeHub/components/AddEditPost/StyledComponents';
import { addEditComment } from 'containers/WeHub/components/actions';
import { PostGroup, EditGroup, GroupEditButton } from './StyledComponents';

export class AddEditComment extends React.PureComponent {
  onChangeCommentText = e => {
    if (e.key === 'Escape') {
      this.onCancelEditComment();
    }

    if (e.key === 'Enter') {
      if (e.shiftKey) {
        return;
      }

      this.props.handleSubmit(this.submitComment)();
      e.target.blur();
    }
  };

  onCancelEditComment = () => {
    const { onFinishEditComment } = this.props;

    if (onFinishEditComment) onFinishEditComment();
  };

  submitComment = immutableValues => {
    const {
      reset,
      postId = '',
      commentId = '',
      onFinishEditComment,
    } = this.props;
    const values = immutableValues.toJS();

    return new Promise((resolve, reject) => {
      const onSuccess = () => {
        reset();
        resolve();
        if (onFinishEditComment) onFinishEditComment();
      };

      this.props.addEditComment(postId, commentId, values.comment, {
        onSuccess,
        onFail: reject,
      });
    }).catch(console.log);
  };

  render() {
    const {
      userAvatar,
      handleSubmit,
      submitting,
      commentId,
      invalid,
      pristine,
    } = this.props;

    return (
      <CommentContainer>
        <Avatar size="small" avatarUrl={userAvatar} style={{ float: 'left' }} />

        <ContentContainer>
          {!commentId ? (
            <PostGroup>
              <Field
                name="comment"
                component={TextAreaField}
                placeholder={formatMessage(messages.leaveComment)}
                autoFocus={!!commentId}
                onKeyDown={this.onChangeCommentText}
                autosize
              />

              {!commentId && (
                <Button
                  onClick={handleSubmit(this.submitComment)}
                  theme="primary"
                  style={{ float: 'right' }}
                  disabled={submitting || invalid || pristine}
                >
                  {formatMessage(submitting ? messages.posting : messages.post)}
                </Button>
              )}
            </PostGroup>
          ) : (
            <EditGroup>
              <Field
                name="comment"
                component={TextAreaField}
                placeholder={formatMessage(messages.leaveComment)}
                autoFocus={!!commentId}
                onKeyDown={this.onChangeCommentText}
                autosize
              />

              <GroupEditButton>
                <span onClick={this.onCancelEditComment}>
                  <i className="zmdi zmdi-close" />
                </span>
                <span onClick={handleSubmit(this.submitComment)}>
                  <i className="zmdi zmdi-check" />
                </span>
              </GroupEditButton>
            </EditGroup>
          )}
        </ContentContainer>

        {submitting && <PostingBlanket />}
      </CommentContainer>
    );
  }
}

AddEditComment.propTypes = {
  handleSubmit: PropTypes.func,
  submitting: PropTypes.bool,
  reset: PropTypes.func,
  invalid: PropTypes.bool,
  pristine: PropTypes.bool,

  postId: PropTypes.number,
  commentId: PropTypes.number,
  addEditComment: PropTypes.func,
  onFinishEditComment: PropTypes.func, // callback when edit comment
  userAvatar: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  userAvatar: makeSelectUserAvatar(),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ addEditComment }, dispatch);

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const validate = immutableValues => {
  const values = immutableValues.toJS();
  const errors = {};
  const hasContent = values.comment && values.comment.trim().length > 0;

  if (!hasContent) {
    errors.comment = 'Please add your comment';
  }

  return errors;
};

const withReduxForm = reduxForm({
  form: 'ADD_EDIT_COMMENT_WE_HUB', // overwrite this props
  enableReinitialize: true,
  validate,
});

export default compose(
  withConnect,
  withReduxForm,
)(AddEditComment);
