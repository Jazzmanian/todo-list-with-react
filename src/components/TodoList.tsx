import React from 'react';
import { HandleDelete, ITask, ToggleComplete } from '../types';
import TodoItem from './TodoItem';

interface TodoListProps {
  taskList: ITask[];
  handleDelete: HandleDelete;
  toggleComplete: ToggleComplete;
}

const TodoList: React.FC<TodoListProps> = ({
  taskList,
  handleDelete,
  toggleComplete,
}) => {
  return (
    <div className="todo-tasks-container">
      {taskList.map((task: ITask) => (
        <TodoItem
          key={task.id}
          task={task}
          handleDelete={handleDelete}
          toggleComplete={toggleComplete}
        />
      ))}
    </div>
  );
};

export default TodoList;
