import React, { useState, memo } from 'react';

import { List, Avatar, Tag } from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';

import formatMessage from 'containers/LanguageProvider/formatMessage';
import globalMessages from 'containers/App/messages';
import { DATE_TIME_FORMAT } from 'config/constants';
import { FieldRow, FieldCol } from 'components/Layout';
import ReadMoreLess from 'components/ReadMoreLess';

import {
  Wrapper,
  Title,
  HR,
  TagWrapper,
  CommentIcon,
} from './StyledComponents';
import { getColorOfTag } from './constants';
import Comments from './Comments';

const IconText = ({ icon, text }) => (
  <span>
    {React.createElement(icon, { style: { marginRight: 8 } })}
    {text}
  </span>
);

const BlogItem = ({ item }) => {
  const [isShowComment, setIsShowComment] = useState(false);

  const onClickOpenComment = () => {
    setIsShowComment(!isShowComment);
  };

  return (
    <Wrapper>
      <List.Item>
        <List.Item.Meta
          title={<Title>{item.title}</Title>}
          description={
            <FieldRow>
              <FieldCol md={24} lg={12}>
                <div>
                  {formatMessage(globalMessages.authorName, {
                    name: item.owner.name,
                  })}
                </div>
                <div>
                  {formatMessage(globalMessages.createdAtDateTime, {
                    dateTime: item.created_at,
                  })}
                </div>
              </FieldCol>

              <FieldCol md={24} lg={12}>
                <TagWrapper>
                  {item.tags.map((value, index) => (
                    <Tag
                      key={value + index}
                      color={
                        getColorOfTag[
                          Math.floor(Math.random() * getColorOfTag.length)
                        ]
                      }
                    >
                      {value}
                    </Tag>
                  ))}
                </TagWrapper>
              </FieldCol>
            </FieldRow>
          }
        />

        <ReadMoreLess
          content={<span dangerouslySetInnerHTML={{ __html: item.content }} />}
          height="110"
        />

        <CommentIcon onClick={onClickOpenComment}>
          <IconText
            icon={MessageOutlined}
            text={item.comments.length}
            key="list-vertical-message"
          />
        </CommentIcon>

        {isShowComment && (
          <Comments postId={item._id} comments={item.comments} />
        )}
      </List.Item>
    </Wrapper>
  );
};

export default memo(BlogItem);
