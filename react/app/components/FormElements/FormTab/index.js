import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { Col, Row } from 'components/Layout';
import Typography from 'components/Typography';

const Wrapper = styled(Row)`
  hr {
    margin-bottom: 20px;
  }
`;

function FormTab({ label, children, type, topLine, ...rest }) {
  return (
    <Wrapper {...rest}>
      {topLine && (
        <Col md={24}>
          <hr />
        </Col>
      )}

      <Col md={6} lg={4}>
        <Typography type={type} label={label} />
      </Col>

      <Col md={18} lg={20} style={{ marginTop: 20 }}>
        {children}
      </Col>
    </Wrapper>
  );
}

FormTab.propTypes = {
  label: PropTypes.string,
  children: PropTypes.any,
  type: PropTypes.string,
  topLine: PropTypes.bool,
};
FormTab.defaultTypes = {
  type: 'heading2',
};

export default FormTab;
