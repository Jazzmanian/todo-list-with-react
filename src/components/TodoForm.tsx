import React, { useState } from 'react';
import { useTodos } from '../hooks/useTodos';
import { InputButton, StyledInput, StyledTitle } from './styles/Input.styles';

const TodoForm: React.FC = () => {
  const [todo, setTodo] = useState('');
  const { addMutation } = useTodos();

  const onClick = (): void => {
    setTodo('');
    if (todo.trim() !== '') {
      addMutation.mutate(todo);
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
