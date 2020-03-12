/**
 * Action Container Component
 *
 * Form's action wrapper, make all `button` align to the right
 * and add top border as divider
 *
 * @prop {bool} noBorder = false to hide the top border
 * @prop {bool || number} borderTopFlow: make the border flow `borderTopFlow`px or 24px (in modal)
 *
 */

import styled, { css } from 'styled-components';
import { colorConfig } from 'config/style';

export const ActionContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  margin-top: 20px;
  padding-top: 25px;
  border-top: 1px solid ${colorConfig.borderInput};

  button,
  a {
    margin-right: 20px;
    min-width: 100px;

    :last-child {
      margin-right: 0px;
    }
  }

  > .ant-row-flex {
    width: calc(100% + 16px);
  }

  ${({ noBorder }) =>
    noBorder &&
    css`
      border-top: 0;
      margin-top: 10px;
      padding-top: 0;
    `};

  ${({ borderTopFlow, noBorder }) =>
    !noBorder &&
    borderTopFlow &&
    css`
      width: auto;
      margin: ${`0 -${borderTopFlow === true ? '24px' : borderTopFlow}`};
      padding: ${borderTopFlow === true ? '24px' : borderTopFlow};
      padding-bottom: 0;
    `};
`;

export default ActionContainer;
