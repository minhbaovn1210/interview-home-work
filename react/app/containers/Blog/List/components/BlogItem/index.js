import React, { useState } from 'react';
import moment from 'moment';
import { List, Avatar, Tag } from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';

import formatMessage from 'containers/LanguageProvider/formatMessage';
import globalMessages from 'containers/App/messages';
import { DATE_TIME_FORMAT } from 'config/constants';
import { FieldRow, FieldCol } from 'components/Layout';

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
      <List.Item key={item.title}>
        <List.Item.Meta
          title={<Title>{item.title}</Title>}
          description={
            <FieldRow>
              <FieldCol md={24} lg={12}>
                <div>
                  {formatMessage(globalMessages.authorName, {
                    name: item.owner,
                  })}
                </div>
                <div>
                  {formatMessage(globalMessages.createdAtDateTime, {
                    dateTime: moment(item.created_at).format(DATE_TIME_FORMAT),
                  })}
                </div>
              </FieldCol>

              <FieldCol md={24} lg={12}>
                <TagWrapper>
                  {item.tags.map(value => (
                    <Tag
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
        {item.content}

        <CommentIcon onClick={onClickOpenComment}>
          <IconText
            icon={MessageOutlined}
            text="2"
            key="list-vertical-message"
          />
        </CommentIcon>

        {isShowComment && <Comments />}
      </List.Item>
    </Wrapper>
  );
};

export default BlogItem;
