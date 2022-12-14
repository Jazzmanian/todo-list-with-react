import React, { useState } from 'react';
import { postTasks } from '../api';
import { AddTodo } from '../types';
import { InputButton, StyledInput, StyledTitle } from './styles/Input.styles';

interface TodoFormProps {
  addTodo: AddTodo;
}

const TodoForm: React.FC<TodoFormProps> = ({ addTodo }) => {
  const [todo, setTodo] = useState('');

  const onClick = (): void => {
    setTodo('');
    if (todo.trim() !== '') {
      postTasks(todo).then(addTodo).catch(console.log);
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
