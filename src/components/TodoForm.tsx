import React, { useState } from 'react';
import { postTasks } from '../api';
import { AddTodo } from '../types';

interface TodoFormProps {
  addTodo: AddTodo;
}

const TodoForm: React.FC<TodoFormProps> = ({ addTodo }) => {
  const [todo, setTodo] = useState('');

  const onClick = (): void => {
    setTodo('');
    if (todo.trim() !== '') {
      postTasks(todo)
        .then((data) => addTodo(data))
        .catch((error) => console.log(error));
    }
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
