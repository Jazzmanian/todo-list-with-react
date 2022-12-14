import React from 'react';
import { HandleDelete, ITask, ToggleComplete } from '../types';
import { TaskContainer } from './styles/Container.styles';
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
    <TaskContainer>
      {taskList.map((task: ITask) => (
        <TodoItem
          key={task.id}
          task={task}
          handleDelete={handleDelete}
          toggleComplete={toggleComplete}
        />
      ))}
    </TaskContainer>
  );
};

export default TodoList;
