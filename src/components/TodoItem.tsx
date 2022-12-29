import React from 'react';
import { ITask } from '../types';
import { MdDeleteOutline } from 'react-icons/md';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { ItemButton, StyledItem, StyledText } from './styles/Item.styles';
import { useTodos } from '../hooks/useTodos';

interface TaskProps {
  task: ITask;
}

const TodoItem: React.FC<TaskProps> = ({ task }) => {
  const { deleteMutation, checkMutation } = useTodos();

  const onDelete = (): void => {
    deleteMutation.mutate(task.id);
  };
  const onCheck = (): void => {
    checkMutation.mutate(task);
  };
  return (
    <StyledItem completed={task.completed}>
      <StyledText data-testid={task.id}>{task.name}</StyledText>
      <ItemButton aria-label="delete-btn" onClick={onDelete}>
        <MdDeleteOutline />
      </ItemButton>
      <ItemButton aria-label="check-btn" onClick={onCheck}>
        <AiOutlineCheckCircle />
      </ItemButton>
    </StyledItem>
  );
};

export default TodoItem;
