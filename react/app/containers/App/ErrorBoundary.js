/* eslint-disable react/prop-types */
import React from 'react';

export default class ErrorBoundary extends React.Component {
  componentDidCatch(error, errorInfo) {
    console.info(error, errorInfo);
  }

  render() {
    return this.props.children;
  }
}
