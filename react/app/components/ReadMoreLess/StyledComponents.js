import styled from 'styled-components';

export const ReadMoreLessWrapper = styled.div`
  p {
    font-weight: 600;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export const ContentWrapper = styled.div`
  height: auto;

  &.limit-height {
    overflow: hidden;
    height: ${(props) => `${props.height}px`};
  }
`;
