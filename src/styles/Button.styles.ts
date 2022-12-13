import styled from 'styled-components';

export const StyledButton = styled.button`
  cursor: pointer;

  &:hover {
    opacity: 0.6;
  }

  &:active {
    transform: translateY(2px);
  }
`;
