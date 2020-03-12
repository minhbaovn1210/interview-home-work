import styled, { css } from 'styled-components';
import colorConfig from 'config/style';

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: ${colorConfig.grayBackground};
  z-index: 10;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const FormWrapper = styled.div`
  width: 424px;
  max-width: 90%;
  background-color: white;
  padding: 40px;
  position: relative;

  a {
    font-size: 14px;
    text-decoration: underline;
    display: flex;
    justify-content: center;
    color: ${colorConfig.darkPrimary};
  }
`;
