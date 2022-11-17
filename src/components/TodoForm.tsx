import React, { useState } from 'react';
import TodoItem from './TodoItem';
import { ITask } from '../interfaces';

const TodoForm: React.FC = () => {
  const [todo, setTodo] = useState('');
  const [taskList, setTaskList] = useState<ITask[]>([]);

  let id = 1;
  if (taskList.length > 0) {
    id = taskList.length + 1;
  }

  const newTask = {
    id,
    name: todo,
    completed: false,
  };

  const onClick = (): void => {
    setTodo('');
    setTaskList(() => [newTask, ...taskList]);
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
        <label className="todo-tasks-container">
          {taskList.map((task: ITask) => (
            <TodoItem key={task.id} task={task} />
          ))}
        </label>
      </div>
    </div>
  );
};

export default TodoForm;
