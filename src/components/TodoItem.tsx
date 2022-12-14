import React from 'react';
import { HandleDelete, ITask, ToggleComplete } from '../types';
import { MdDeleteOutline } from 'react-icons/md';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { deleteTask, putTask } from '../api';
import { ItemButton, StyledItem, StyledText } from './styles/Item.styles';

interface TaskProps {
  task: ITask;
  handleDelete: HandleDelete;
  toggleComplete: ToggleComplete;
}

const TodoItem: React.FC<TaskProps> = ({
  task,
  handleDelete,
  toggleComplete,
}) => {
  const onDelete = (): void => {
    deleteTask(task.id)
      .then(() => handleDelete(task.id))
      .catch(console.log);
  };
  const onCheck = (): void => {
    putTask(task)
      .then(() => toggleComplete(task.id))
      .catch(console.log);
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
