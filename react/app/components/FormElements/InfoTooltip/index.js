/**
 *
 * InfoTooltip component
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Popover } from 'antd';

import { ToolTipContainer, InfoIcon } from './StyledComponents';

const InfoTooltip = (props) => (
  <Popover
    arrowPointAtCenter
    placement="bottom"
    content={<ToolTipContainer>{props.children}</ToolTipContainer>}
    trigger="hover"
  >
    <InfoIcon className="zmdi zmdi-info-outline" />
  </Popover>
);

InfoTooltip.propTypes = {
  children: PropTypes.any,
};

export default InfoTooltip;
