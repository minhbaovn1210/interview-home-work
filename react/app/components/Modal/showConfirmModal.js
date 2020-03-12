/**
 *
 * Confirm Modal component
 *
 * https://ant.design/components/modal/
 * Using Modal.method()
 *
 */

import React from 'react';
import styled from 'styled-components';
import { Modal } from 'antd';
import Typography from 'components/Typography';
import formatMessage from 'containers/LanguageProvider/formatMessage';
import globalMessages from 'containers/App/messages';
import { colorConfig } from 'config/style';

const { confirm } = Modal;

const showConfirmModal = ({
  title,
  content,
  onOk,
  onCancel,
  confirmDelete,
  ...rest
}) =>
  confirm({
    title: (
      <Typography uppercase noMargin theme="header" type="heading3">
        {title || formatMessage(globalMessages.confirmation)}
      </Typography>
    ),
    content: <ContentWrapper>{content}</ContentWrapper>,
    className: 'confirm-modal-container',
    okText: formatMessage(globalMessages.yes),
    cancelText: formatMessage(globalMessages.no),
    centered: true,
    icon: ' ',
    onCancel,
    onOk,
    ...rest,
    okButtonProps: {
      type: confirmDelete ? 'danger' : 'primary',
      ...rest.okButtonProps,
    },
  });

// eslint-disable-next-line
export const ContentWrapper = ({ children }) => (
  <ContentContainer>
    {children}
    <HR />
  </ContentContainer>
);

export default showConfirmModal;

const ContentContainer = styled.div`
  position: relative;
  margin-left: -38px;
`;

const HR = styled.div`
  margin: 20px -32px 0 -32px;
  border-bottom: 1px solid ${colorConfig.borderInput};
`;
