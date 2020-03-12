/**
 *
 * Label component
 * @prop {string} label
 * @prop {string} infoTooltip: popup message to display
 * @prop {bool} isRequired: show required mark next to label when use as a form element
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import InfoTooltip from 'components/FormElements/InfoTooltip';

import { RequiredIndicator, LabelContainer } from './StyledComponents';

const Label = ({ label, isRequired, infoTooltip, children, ...rest }) => {
  if (!label && !children) return null;

  return (
    <LabelContainer {...rest} className="field-label">
      {label || children}

      {isRequired && <RequiredIndicator />}

      {infoTooltip && <InfoTooltip>{infoTooltip}</InfoTooltip>}
    </LabelContainer>
  );
};

Label.propTypes = {
  label: PropTypes.any,
  infoTooltip: PropTypes.string,
  isRequired: PropTypes.bool,
  children: PropTypes.any,
};

export default Label;
