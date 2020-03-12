/**
 *
 * AntTable component
 *
 * Using Table component of Ant Design
 * Visit https://ant.design/components/table for documentation
 *
 * Table component already includes Loading component and Pagination component
 *
 * @prop {array} data:
 * @prop {array} columns:
 * @prop {bool} loading:
 * @prop {bool} wrapCell: make table cell wrap in 1 line or many
 * @prop {int} currentPage:
 * @prop {int} totalPages:
 * @prop {func} onChangePage:
 * @prop {string} margin:
 * @prop {object} style:
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';
import styled, { css } from 'styled-components';

import Pagination from 'components/Table/Pagination';
import './style.less';

const AntTable = ({
  dataSource = [],
  columns = [],
  pagination,
  onChangePage,
  onChangeItemsPerPage,
  margin,
  tableStyle,
  scroll,
  wrapContent = true,
  ...rest
}) => {
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  if (pagination.currentPage !== currentPage) {
    setCurrentPage(pagination.currentPage);
  }

  if (pagination.itemsPerPage !== itemsPerPage) {
    setItemsPerPage(pagination.itemsPerPage);
  }

  const handleOnChangeItemsPerPage = (page) => {
    if (onChangeItemsPerPage) onChangeItemsPerPage(page);
    setItemsPerPage(page);
  };

  const handleOnChangePage = (page) => {
    if (onChangePage) onChangePage(page);
    setCurrentPage(page);
  };

  const renderPagination = () => (
    <Pagination
      currentPage={currentPage || 1}
      totalPages={pagination.totalPages || 1}
      onChangePage={handleOnChangePage}
      onChangeItemsPerPage={handleOnChangeItemsPerPage}
      itemsPerPage={parseInt(itemsPerPage, 10)}
      loading={rest.loading}
      totalItems={pagination.totalItems}
    />
  );

  return (
    <TableContainer style={{ margin }}>
      {renderPagination()}

      <StyledAntTable
        columns={columns}
        dataSource={dataSource}
        sortable
        noDataText=""
        resizable={false}
        showPagination={false}
        pagination={false}
        expandRowByClick
        scroll={{ x: true, ...scroll }}
        style={tableStyle}
        wrapContent={wrapContent}
        rowKey="id"
        {...rest}
      />

      {renderPagination()}
    </TableContainer>
  );
};

AntTable.propTypes = {
  loading: PropTypes.bool,
  wrapContent: PropTypes.bool,
  dataSource: PropTypes.array,
  columns: PropTypes.array,
  onChangePage: PropTypes.func,
  onChangeItemsPerPage: PropTypes.func,
  margin: PropTypes.string,
  style: PropTypes.object,
  pagination: PropTypes.object,
  tableStyle: PropTypes.object,
  scroll: PropTypes.object,
  noDataBanner: PropTypes.object,
};

export default AntTable;

/**
 * Styled-components
 */

const StyledAntTable = styled(Table)`
  .ant-table-thead > tr > th {
    font-weight: 600;
  }

  ${(props) =>
    !props.wrapContent &&
    css`
      .ant-table td {
        white-space: pre-wrap;
        overflow-wrap: break-word;
      }
    `};
`;

const TableContainer = styled.div``;
