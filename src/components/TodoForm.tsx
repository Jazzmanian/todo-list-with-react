import React, { useState } from 'react';
import { AddTodo } from '../interfaces';

interface TodoFormProps {
  addTodo: AddTodo;
}

const TodoForm: React.FC<TodoFormProps> = ({ addTodo }: TodoFormProps) => {
  const [todo, setTodo] = useState('');

  const onClick = (): void => {
    setTodo('');
    addTodo(todo);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setTodo(e.target.value);
  };
  return (
    <div>
      <div>
        <input
          type="text"
          value={todo}
          aria-label="todo-input"
          onChange={handleChange}
          placeholder="Enter your todo item"
          autoFocus
        />
        <button onClick={onClick}>Add Items</button>
      </div>
    </div>
  );
};

export default TodoForm;
