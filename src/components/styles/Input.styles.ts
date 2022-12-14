import { StyledButton } from './../../styles/Button.styles';
import styled from 'styled-components';

export const StyledTitle = styled.h1`
  color: ${({ theme }) => theme.colors.title};
  margin-bottom: 1.5rem;
  margin-top: 1.5rem;
`;

export const StyledInput = styled.input`
  border: 0;
  outline: 0;
  padding: 5px;
  border: solid 4px ${({ theme }) => theme.colors.textbox};
  background: ${({ theme }) => theme.colors.input};
  color: ${({ theme }) => theme.colors.textbox};
  border-top-left-radius: 25px;
  border-bottom-left-radius: 25px;
`;

export const InputButton = styled(StyledButton)`
  border-top-right-radius: 25px;
  border-bottom-right-radius: 25px;
  background-color: ${({ theme }) => theme.colors.textbox};
  border: 0;
  outline: 0;
  color: ${({ theme }) => theme.colors.input};
  padding: 9px;
`;
