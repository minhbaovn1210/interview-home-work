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
  padding-bottom: 24px;
  input {
    float: left;
    max-width: 300px !important;
  }

  .search-button {
    float: left;
    margin-left: 24px;
    margin-top: -16px;
    height: 38px;
  }

  .add-button {
    float: right;
  }
`;
