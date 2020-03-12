import styled from 'styled-components';
import colorConfig from 'config/style';

export const CommentContainer = styled.div`
  position: relative;
  width: 100%;
  margin-top: 30px;
  height: fit-content;
`;

export const ContentContainer = styled.div`
  margin-left: 60px;
  overflow-wrap: break-word;
  word-wrap: break-word;
  white-space: pre-line;
  word-break: break-word;
  padding-right: 20px;

  textarea {
    overflow: hidden;
    resize: none;
    min-height: 40px !important;
    padding-top: 8px;
  }
`;

export const AuthorName = styled.span`
  color: ${colorConfig.primary};
  font-weight: 500;
  margin-right: 10px;
`;

export const PeopleLike = styled.div`
  margin-left: 0 !important;
`;

export const FooterContainer = styled.div`
  margin-top: 5px;
  margin-left: 60px;
  font-size: 12px;
  display: flex;

  > div {
    margin-left: 20px;

    :first-child {
      margin-left: 0;
    }
  }
`;
