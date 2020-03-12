import styled from 'styled-components';
import colorConfig from 'config/style';

export const Wrapper = styled.div`
  width: 100%;
  border-bottom: thin solid ${colorConfig.borderInput};
  margin-top: 40px;
`;

export const Title = styled.div`
  text-align: center;
  font-weight: bold;
  font-size: 20px;
`;

export const TagWrapper = styled.div`
  text-align: right;
`;

export const CommentIcon = styled.div`
  cursor: pointer;
  color: ${colorConfig.grayText};
  margin: 8px 0;
  width: fit-content;
`;
