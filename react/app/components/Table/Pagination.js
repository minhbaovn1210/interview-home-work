/* eslint-disable react/no-array-index-key */
/**
 *
 * Pagination
 * @prop {number} totalPages: total pages ( = total-records / rows-per-page)
 * @prop {func} onChangePage(pageNumber): call back when page changed
 *
 */

import React from 'react';
import uuid from 'uuid';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Select } from 'antd';
import { FormattedMessage } from 'react-intl';

import colorConfig from 'config/style';
import formatMessage from 'containers/LanguageProvider/formatMessage';
import globalMessages from 'containers/App/messages';

const { Option } = Select;

const NEXT_ICON = '>';
const PREV_ICON = '<';

export default class CustomPagination extends React.Component {
  state = {
    currentPage: 1,
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.currentPage !== nextProps.currentPage) {
      this.setState({ currentPage: nextProps.currentPage });
    }
  }

  getPages = () => {
    const { totalPages } = this.props;
    const { currentPage } = this.state;

    if (totalPages <= 1) {
      return [1];
    }

    if (totalPages <= 7) {
      return Array(totalPages)
        .fill(0)
        .map((e, i) => i + 1);
    }

    const pages = Array(5).fill(0);
    pages[0] = PREV_ICON;
    pages[4] = NEXT_ICON;

    if (currentPage - 1 <= 3) {
      pages[0] = 2;
      pages[1] = 3;
      pages[2] = 4;
      pages[3] = 5;

      return [1, ...pages, totalPages];
    }

    if (totalPages - currentPage <= 3) {
      pages[4] = totalPages - 1;
      pages[3] = totalPages - 2;
      pages[2] = totalPages - 3;
      pages[1] = totalPages - 4;

      return [1, ...pages, totalPages];
    }

    pages[1] = currentPage - 1;
    pages[2] = currentPage;
    pages[3] = currentPage + 1;

    return [1, ...pages, totalPages];
  };

  goToPage = page => {
    if (this.props.loading) return;

    const { onChangePage } = this.props;
    const { currentPage } = this.state;

    let pageToGo = page;

    if (pageToGo === PREV_ICON) {
      pageToGo = currentPage - 1;
    }
    if (pageToGo === NEXT_ICON) {
      pageToGo = currentPage + 1;
    }

    this.setState({ currentPage: pageToGo });

    if (onChangePage) {
      onChangePage(pageToGo);
    }
  };

  renderNumberItemPerPage = () => {
    const {
      totalItems = 0,
      onChangeItemsPerPage,
      itemsPerPage = 10,
    } = this.props;

    return (
      <span>
        {formatMessage(globalMessages.show)}

        <Select
          value={itemsPerPage}
          style={{ width: 120 }}
          onChange={onChangeItemsPerPage}
        >
          {[10, 20, 50, 100].map(v => (
            <Option value={v} key={v}>
              {v}
            </Option>
          ))}
        </Select>

        <FormattedMessage
          {...globalMessages.totalRecordFound}
          values={{
            number: (
              <b style={{ textTransform: 'lowerCase' }}>
                {totalItems} {formatMessage(globalMessages.records)}
              </b>
            ),
          }}
        />
      </span>
    );
  };

  renderPagingItems = () => {
    const { currentPage } = this.state;

    return (
      <PagingItemContainer>
        {this.getPages().map(page => (
          <PaginationButton
            className={classnames({
              'current-page': currentPage === page,
              'more-icon': [PREV_ICON, NEXT_ICON].includes(page),
            })}
            key={uuid()}
            onClick={() => this.goToPage(page)}
          >
            {[PREV_ICON, NEXT_ICON].includes(page) ? '...' : page}
          </PaginationButton>
        ))}
      </PagingItemContainer>
    );
  };

  render() {
    return (
      <Wrapper>
        {this.renderNumberItemPerPage()}

        {this.renderPagingItems()}
      </Wrapper>
    );
  }
}

CustomPagination.propTypes = {
  totalPages: PropTypes.number,
  totalItems: PropTypes.number,
  currentPage: PropTypes.number,
  itemsPerPage: PropTypes.number,
  onChangePage: PropTypes.func,
  onChangeItemsPerPage: PropTypes.func,
  loading: PropTypes.bool,
};

CustomPagination.defaultProps = {
  totalPages: 1,
  currentPage: 1,
  loading: false,
};

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 30px;

  .anticon {
    vertical-align: 2px;
  }

  .ant-select {
    width: 88px !important;
    margin: 0 12px;

    .ant-select-selection--single,
    .ant-select-selection-selected-value,
    .ant-select-selection__rendered {
      height: 32px;
      line-height: 32px;
      box-shadow: none;
    }

    .ant-select-arrow {
      background-color: rgb(233, 233, 233);
      height: 30px;
      padding: 8px 10px;
      top: 6px;
      right: 0;
      border-radius: 0 4px 4px 0;
    }
  }
`;

const PaginationButton = styled.div`
  padding: 5px 12px;
  display: inline-block;
  cursor: pointer;
  min-width: 40px;
  height: 32px;
  margin-right: 8px;
  text-align: center;
  vertical-align: middle;
  border-radius: 4px;
  outline: 0;
  cursor: pointer;

  :last-of-type {
    margin-right: 0;
  }

  :hover {
    background-color: ${colorConfig.darkPrimary};
    border-color: ${colorConfig.darkPrimary};
    color: white;
  }
`;

const PagingItemContainer = styled.div`
  .current-page {
    background-color: ${colorConfig.darkPrimary};
    border-color: ${colorConfig.darkPrimary};
    color: white;
  }

  .more-icon {
    border: none;
  }
`;
