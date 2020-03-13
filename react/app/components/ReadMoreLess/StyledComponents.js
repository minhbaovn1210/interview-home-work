import styled from 'styled-components';
import colorConfig from 'config/style';

export const ReadMoreLessWrapper = styled.div`
  p {
    font-weight: 600;
    margin-top: 8px;
    color: ${colorConfig.pendingPayment}

    &:hover {
      text-decoration: underline;
    }
  }
  cursor: pointer;
`;

export const ContentWrapper = styled.div`
  height: auto;

  &.limit-height {
    overflow: hidden;
    height: ${props => `${props.height}px`};
  }
`;
