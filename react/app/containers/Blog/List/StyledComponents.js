import styled from 'styled-components';
import { FieldRow } from 'components/Layout';

export const Wrapper = styled.div`
  width: 100%;
  padding: 0 30px 30px;
  padding-right: 0;
  position: relative;
`;

export const SearchWrapper = styled(FieldRow)`
  border-bottom: thin solid black;
  padding-bottom: 8px;

  .search-button {
    height: 40px;
  }

  .add-button {
    float: right;
  }
`;
