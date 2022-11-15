import React, { useState } from 'react';

const TodoForm = (): JSX.Element => {
  const [todo, setTodo] = useState('');

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
      </div>
    </div>
  );
};

export default TodoForm;
