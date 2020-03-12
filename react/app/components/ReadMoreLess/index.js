import React from 'react';
import PropTypes from 'prop-types';

import formatMessage from 'containers/LanguageProvider/formatMessage';
import globalMessages from 'containers/App/messages';

import { ReadMoreLessWrapper, ContentWrapper } from './StyledComponents';

class ReadMoreLess extends React.Component {
  state = {
    isEllipse: false,
    isSeeMore: true,
  };

  componentDidMount() {
    this.checkContentHeight();
  }

  checkContentHeight = () => {
    const height = this.content.clientHeight;

    this.setState({
      isEllipse: height > this.props.height,
    });
  };

  changeView = () => {
    this.setState({
      isSeeMore: !this.state.isSeeMore,
    });
  };

  render() {
    const { content, height } = this.props;
    const { isEllipse, isSeeMore } = this.state;

    const isShowSeeMore = isEllipse && isSeeMore;
    const isShowSeeLess = isEllipse && !isSeeMore;

    return (
      <React.Fragment>
        <ContentWrapper
          innerRef={(el) => {
            this.content = el;
          }}
          className={isEllipse && isSeeMore ? 'limit-height' : ''}
          height={height}
        >
          {content || ''}
        </ContentWrapper>

        {isShowSeeLess && (
          <ReadMoreLessWrapper onClick={this.changeView}>
            <p> {formatMessage(globalMessages.seeLess)}</p>
          </ReadMoreLessWrapper>
        )}

        {isShowSeeMore && (
          <ReadMoreLessWrapper onClick={this.changeView}>
            ...
            <p> {formatMessage(globalMessages.seeMore)}</p>
          </ReadMoreLessWrapper>
        )}
      </React.Fragment>
    );
  }
}

ReadMoreLess.propTypes = {
  content: PropTypes.string,
  height: PropTypes.string,
};

export default ReadMoreLess;
