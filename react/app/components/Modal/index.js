/**
 *
 * Modal component
 *
 * https://ant.design/components/modal/
 *
 * @prop {func} onCancel
 * @prop {bool} visible
 * @prop {string} desktopWidth width of modal on desktop (in px)
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'antd';
import styled, { css } from 'styled-components';

/* eslint-disable indent */
const AntdModal = styled(Modal)`
  @media (min-width: 992px) {
    ${(props) =>
      props.desktopWidth &&
      css`
        &.ant-modal {
          width: ${props.desktopWidth} !important;
        }
      `};
  }
`;
/* eslint-enable indent */

const CustomModal = ({ noPadding, children, ...props }) => (
  <AntdModal
    width={700}
    maskClosable={false}
    footer={null}
    destroyOnClose
    centered
    {...props}
  >
    <div style={{ margin: noPadding ? -24 : 0 }}>
      {props.visible && children}
    </div>
  </AntdModal>
);

CustomModal.propTypes = {
  children: PropTypes.any,
  visible: PropTypes.bool,
  noPadding: PropTypes.bool,
};

export default CustomModal;
