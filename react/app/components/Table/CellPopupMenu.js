/* eslint-disable react/prefer-stateless-function */
/**
 *
 * Row Menu
 * @prop {any} children: list of popup menu items, each should wrapped by <MenuItem>
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Dropdown, Menu, Icon } from 'antd';

import { colorConfig } from 'config/style';

const AntdIcon = styled(Icon)`
  border-radius: 50%;
  height: 25px;
  width: 25px;
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: space-around;

  :hover {
    background-color: ${colorConfig.borderInput};
  }
`;

export const MenuItem = Menu.Item;

export const CellPopupMenu = ({ children }) => (
  <Dropdown overlay={<Menu>{children}</Menu>} trigger={['click']}>
    <AntdIcon type="more" />
  </Dropdown>
);

CellPopupMenu.propTypes = {
  children: PropTypes.any,
};

export default CellPopupMenu;
