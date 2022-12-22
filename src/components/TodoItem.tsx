import React from 'react';
import { ITask } from '../types';
import { MdDeleteOutline } from 'react-icons/md';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { deleteTask, putTask } from '../api';
import { ItemButton, StyledItem, StyledText } from './styles/Item.styles';
import { useMutation, useQueryClient } from 'react-query';

interface TaskProps {
  task: ITask;
}

const TodoItem: React.FC<TaskProps> = ({ task }) => {
  const queryClient = useQueryClient();
  const deleteMutation = useMutation(deleteTask, {
    onSuccess: async () => {
      await queryClient.invalidateQueries('todos');
    },
  });
  const checkMutation = useMutation(putTask, {
    onSuccess: async () => {
      await queryClient.invalidateQueries('todos');
    },
  });
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
