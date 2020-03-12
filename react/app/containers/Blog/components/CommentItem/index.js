import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';

import Avatar from 'components/Avatar';
import { DropdownMenu, MenuItem } from 'components/DropdownMenu';
import ReadMoreLess from 'components/ReadMoreLess';
import formatMessage from 'containers/LanguageProvider/formatMessage';
import globalMessages from 'containers/App/messages';
import { PostTime } from 'containers/WeHub/components/PostItem/StyledComponents';
import { ReactButton } from 'containers/WeHub/components/PostFooter/StyledComponents';
import showConfirmModal from 'components/Modal/showConfirmModal';
import messages from 'containers/WeHub/components/messages';
import AddEditComment from 'containers/WeHub/components/AddEditComment';
import {
  deleteComment,
  likeComment,
} from 'containers/WeHub/components/actions';

import {
  CommentContainer,
  ContentContainer,
  AuthorName,
  FooterContainer,
  PeopleLike,
} from './StyledComponents';

class PostItem extends React.Component {
  state = {
    isEdit: false,
  };

  onClickLikeComment = () => {
    const { comment = {}, postId } = this.props;

    this.props.likeComment(postId, comment.id, !comment.isLiked);
  };

  onClickEditComment = () => {
    this.setState({ isEdit: true });
  };

  onDeleteComment = () => {
    const { comment, postId } = this.props;

    showConfirmModal({
      title: formatMessage(messages.deleteComment),
      content: formatMessage(messages.deleteCommentConfirm),
      confirmDelete: true,
      onOk: () => {
        this.props.deleteComment(postId, comment.id);
      },
    });
  };

  render() {
    const { isEdit } = this.state;
    const { postId, comment = {} } = this.props;
    const isShowMenu = comment.canDelete || comment.canEdit;

    if (isEdit)
      return (
        <AddEditComment
          form={`EDIT_COMMENT_POST_${postId}_${comment.id}`}
          postId={postId}
          commentId={comment.id}
          onFinishEditComment={() => {
            this.setState({ isEdit: false });
          }}
          initialValues={{
            comment: comment.content,
          }}
        />
      );

    return (
      <CommentContainer>
        <Avatar
          size="small"
          avatarUrl={comment.authorAvatar}
          style={{ float: 'left' }}
        />
        <ContentContainer>
          <AuthorName>{comment.authorName}</AuthorName>

          <ReadMoreLess content={comment.content} height="65" />
        </ContentContainer>

        <FooterContainer>
          <PostTime>{comment.createdAt}</PostTime>

          <ReactButton
            liked={comment.isLiked}
            onClick={this.onClickLikeComment}
          >
            <i
              style={{ fontSize: 20 }}
              className={`zmdi zmdi-favorite${
                comment.isLiked ? '' : '-outline'
              }`}
            />
            &nbsp;
            {formatMessage(messages.like)}
          </ReactButton>

          {comment.likeNumber > 0 && (
            <PeopleLike>
              <span>(</span>
              {!comment.isLiked ? (
                comment.likeNumber >= 1 && (
                  <React.Fragment>
                    {comment.likeNumber}
                    &nbsp;
                    {formatMessage(
                      comment.likeNumber > 1 ? messages.likes : messages.like,
                    )}
                  </React.Fragment>
                )
              ) : (
                <React.Fragment>
                  {comment.likeNumber > 1 ? (
                    <React.Fragment>
                      {formatMessage(messages.peopleLikeThisPost, {
                        youAnd: formatMessage(messages.youAnd),
                        likes: comment.likeNumber - 1,
                      })}
                    </React.Fragment>
                  ) : (
                    formatMessage(messages.youLikeThis)
                  )}
                </React.Fragment>
              )}
              <span>)</span>
            </PeopleLike>
          )}
        </FooterContainer>

        {isShowMenu && (
          <DropdownMenu style={{ position: 'absolute', top: 0, right: 0 }}>
            {comment.canEdit && (
              <MenuItem onClick={this.onClickEditComment}>
                {formatMessage(globalMessages.edit)}
              </MenuItem>
            )}
            {comment.canDelete && (
              <MenuItem onClick={this.onDeleteComment}>
                {formatMessage(globalMessages.delete)}
              </MenuItem>
            )}
          </DropdownMenu>
        )}
      </CommentContainer>
    );
  }
}

PostItem.propTypes = {
  comment: PropTypes.object,
  postId: PropTypes.number,
  deleteComment: PropTypes.func,
  likeComment: PropTypes.func,
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      deleteComment,
      likeComment,
    },
    dispatch,
  );

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(withConnect)(PostItem);
