/* eslint-disable react/prefer-stateless-function */
/**
 *
 * ListPosts
 *
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';
import { Helmet } from 'react-helmet';
import { List, Button } from 'antd';
import { Link } from 'react-router-dom';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import formatMessage from 'containers/LanguageProvider/formatMessage';
import globalMessages from 'containers/App/messages';
import routes from 'config/routes';

import { getBlogList } from './actions';
import {
  makeSelectBlogList,
  makeSelectBlogListLoading,
  makeSelectBlogListPagination,
} from './selectors';
import Loading from 'components/Loading';
import Input from 'components/FormElements/Input';
import { FieldCol } from 'components/Layout';

import { Wrapper, SearchWrapper } from './StyledComponents';
import {} from './constants';
import saga from './saga';
import reducer from './reducer';
import BlogItem from './BlogItem';

const itemsPerPage = 3;

const ListPosts = ({
  getBlogList,
  loading,
  blogList,
  pagination,
  location,
}) => {
  const [filter, setFilter] = useState('');
  useInjectSaga({ key: 'BLOG_DOMAIN', saga });
  useInjectReducer({ key: 'BLOG_DOMAIN', reducer });

  useEffect(() => {
    getBlogList({ itemsPerPage, currentPage: 1 });
  }, [location.key]);

  const onChangeFilter = e => {
    setFilter(e.target.value);
  };

  const onPressEnter = () => {
    getBlogList({ itemsPerPage, currentPage: 1, filter });
  };

  return (
    <React.Fragment>
      <Helmet>
        <title>{formatMessage(globalMessages.blogList)} </title>
      </Helmet>

      {loading && <Loading />}

      <SearchWrapper>
        <FieldCol xs={24} md={16} lg={6}>
          <Input
            value={filter}
            onChange={onChangeFilter}
            onPressEnter={onPressEnter}
          />
        </FieldCol>

        <FieldCol xs={24} md={8} lg={6}>
          <Button
            className="search-button"
            type="primary"
            onClick={onPressEnter}
          >
            {formatMessage(globalMessages.search)}
          </Button>
        </FieldCol>

        <FieldCol xs={24} md={24} lg={12}>
          <Link to={routes.blog.add}>
            <Button className="add-button" type="primary" shape="circle">
              +
            </Button>
          </Link>
        </FieldCol>
      </SearchWrapper>

      <Wrapper>
        <List
          itemLayout="vertical"
          size="large"
          pagination={{
            onChange: currentPage => {
              getBlogList({ itemsPerPage, currentPage, filter });
            },
            pageSize: pagination.itemsPerPage,
            total: pagination.totalItems,
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
  pagination: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  blogList: makeSelectBlogList(),
  loading: makeSelectBlogListLoading(),
  pagination: makeSelectBlogListPagination(),
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
