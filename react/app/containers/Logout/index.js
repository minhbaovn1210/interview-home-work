import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { logOutAction } from 'containers/App/actions';

const LogOut = ({ logout }) => {
  React.useEffect(() => {
    logout();
  }, []);

  return null;
};

LogOut.propTypes = {
  logout: PropTypes.func,
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ logout: logOutAction }, dispatch);

export default connect(
  null,
  mapDispatchToProps,
)(LogOut);
