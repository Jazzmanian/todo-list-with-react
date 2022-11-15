import React, { useState } from 'react';

const TodoForm = (): JSX.Element => {
  const [todo, setTodo] = useState('');
  const tasks: Array<{ id: number; name: string }> = [
    { id: 1, name: 'task 01' },
    { id: 2, name: 'task 02' },
  ];

  const onClick = (): void => {
    setTodo('');
  };
  return (
    <div>
      <div>
        <input
          type="text"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          placeholder="Enter your todo item"
          autoFocus
        />
        <button onClick={onClick}>Add Items</button>
        <label className="elements">
          {tasks.map((task) => (
            <div key={task.id}>{task.name}</div>
          ))}
        </label>
      </div>
    </div>
  );
};

export default TodoForm;
