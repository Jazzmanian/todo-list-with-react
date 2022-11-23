import React from 'react';
import { HandleDelete, ITask } from '../types';
import TodoItem from './TodoItem';

interface TodoListProps {
  taskList: ITask[];
  handleDelete: HandleDelete;
}

const TodoList: React.FC<TodoListProps> = ({ taskList, handleDelete }) => {
  return (
    <div>
      <div className="todo-tasks-container">
        {taskList.map((task: ITask) => (
          <TodoItem key={task.id} task={task} handleDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
};

export default TodoList;
