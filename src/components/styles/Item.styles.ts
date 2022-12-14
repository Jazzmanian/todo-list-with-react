import styled from 'styled-components';
import { StyledButton } from '../../styles/Button.styles';

interface ItemProps {
  completed: boolean | string;
}
export const StyledItem = styled.div<ItemProps>`
  margin: 0.5rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.7rem;
  border-radius: 0.3rem;
  background: ${(props) =>
    props.completed !== false
      ? 'gray'
      : 'linear-gradient(to right, #f6d365 0%, #fda085 60%)'};
  color: rgb(255, 255, 255);
  text-decoration: ${(props) =>
    props.completed !== false ? 'line-through' : 'none'};
  box-shadow: rgba(149, 157, 165, 0.8) 0px 8px 24px;
`;

export const ItemButton = styled(StyledButton)`
  font-size: 150%;
  background-color: inherit;
  border: 0;
  padding-right: 0.5rem;
`;

export const StyledText = styled.h4`
  padding-right: 10rem;
`;
