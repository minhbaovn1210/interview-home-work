/* eslint-disable react/prefer-stateless-function */
/**
 *
 * ListPosts
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';
import { Helmet } from 'react-helmet';
import { List, Button } from 'antd';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import formatMessage from 'containers/LanguageProvider/formatMessage';
import globalMessages from 'containers/App/messages';
import routes from 'config/routes';

import { getBlogList } from './actions';
import { makeSelectBlogList, makeSelectBlogListLoading } from './selectors';
import Loading from 'components/Loading';

import { Wrapper } from './StyledComponents';
import {} from './constants';
import saga from './saga';
import reducer from './reducer';
import BlogItem from './components/BlogItem';

const ListPosts = ({ getBlogList, loading, blogList }) => {
  useInjectSaga({ key: 'BLOG_DOMAIN', saga });
  useInjectReducer({ key: 'BLOG_DOMAIN', reducer });

  useEffect(() => {
    getBlogList();
  }, []);

  return (
    <React.Fragment>
      <Helmet>
        <title>{formatMessage(globalMessages.blogList)} </title>
      </Helmet>

      {loading && <Loading />}

      <Wrapper>
        <Button className="add-button" type="primary" shape="circle">
          +
        </Button>

        <List
          itemLayout="vertical"
          size="large"
          pagination={{
            onChange: page => {
              console.log(page);
            },
            pageSize: 3,
          }}
          dataSource={blogList}
          renderItem={item => <BlogItem key={item.id} item={item} />}
        />
      </Wrapper>
    </React.Fragment>
  );
};

ListPosts.propTypes = {
  getBlogList: PropTypes.func,
  loading: PropTypes.bool,
  blogList: PropTypes.array,
  location: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  blogList: makeSelectBlogList(),
  loading: makeSelectBlogListLoading(),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getBlogList,
    },
    dispatch,
  );

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(ListPosts);
