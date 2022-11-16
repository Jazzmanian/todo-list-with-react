import React, { useState } from 'react';
import TodoItem from './TodoItem';
import { ITask } from '../Interfaces';
import { tasks } from '../Constants';

const TodoForm = (): JSX.Element => {
  const [todo, setTodo] = useState('');

  const onClick = (): void => {
    setTodo('');
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void =>
    setTodo(e.target.value);
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
        <label className="elements">
          {tasks.map((task: ITask) => (
            <TodoItem key={task.id} task={task} />
          ))}
        </label>
      </div>
    </div>
  );
};

export default TodoForm;
