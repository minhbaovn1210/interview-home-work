import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Comment, Form, Button, List, Input } from 'antd';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';

import formatMessage from 'containers/LanguageProvider/formatMessage';
import globalMessages from 'containers/App/messages';

import { getBlogDetail, submitAddComment } from '../actions';

const { TextArea } = Input;

const CommentList = ({ comments }) => (
  <List
    dataSource={comments}
    renderItem={item => (
      <Comment
        author={(item.owner || {}).name}
        content={item.content}
        datetime={item.created_at}
      />
    )}
  />
);

const Comments = ({ comments, postId, getBlogDetail, submitAddComment }) => {
  const [value, setValue] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    getBlogDetail(postId);
  }, []);

  const onSubmit = () => {
    if (value.length === 0) return;

    setSubmitting(true);

    submitAddComment(
      { postId, content: value },
      {
        onSuccess: () => {
          setValue('');
          setSubmitting(false);
        },
        onFail: () => {
          setSubmitting(false);
        },
      },
    );
  };

  return (
    <div>
      {comments.length > 0 && <CommentList comments={comments} />}

      <Comment
        content={
          <div>
            <Form.Item>
              <TextArea
                rows={4}
                onChange={e => setValue(e.target.value)}
                value={value}
              />
            </Form.Item>

            <Form.Item>
              <Button
                disabled={value.length === 0}
                onClick={onSubmit}
                type="primary"
                disabled={submitting}
              >
                {formatMessage(globalMessages.add)}
              </Button>
            </Form.Item>
          </div>
        }
      />
    </div>
  );
};

Comments.propTypes = {
  getBlogDetail: PropTypes.func,
  submitAddComment: PropTypes.func,
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getBlogDetail,
      submitAddComment,
    },
    dispatch,
  );

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Comments);
