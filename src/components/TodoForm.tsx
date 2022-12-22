import React, { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { postTasks } from '../api';
import { InputButton, StyledInput, StyledTitle } from './styles/Input.styles';

const TodoForm: React.FC = () => {
  const queryClient = useQueryClient();
  const [todo, setTodo] = useState('');
  const mutation = useMutation(postTasks, {
    onSuccess: async () => {
      await queryClient.invalidateQueries('todos');
    },
  });

  const onClick = (): void => {
    setTodo('');
    if (todo.trim() !== '') {
      mutation.mutate(todo);
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setTodo(e.target.value);
  };
  return (
    <div>
      <StyledTitle>Todo List</StyledTitle>
      <StyledInput
        type="text"
        value={todo}
        aria-label="todo-input"
        onChange={handleChange}
        placeholder="Enter your todo item"
        autoFocus
      />
      <InputButton onClick={onClick}>Add Items</InputButton>
    </div>
  );
};

export default TodoForm;
