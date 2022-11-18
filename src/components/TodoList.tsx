import React from 'react';
import { ITask } from '../interfaces';
import TodoItem from './TodoItem';

interface TodoListProps {
  taskList: ITask[];
}

const TodoList: React.FC<TodoListProps> = ({ taskList }: TodoListProps) => {
  return (
    <div>
      <label className="todo-tasks-container">
        {taskList.map((task: ITask) => (
          <TodoItem key={task.id} task={task} />
        ))}
      </label>
    </div>
  );
};

export default TodoList;
