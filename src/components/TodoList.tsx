import React from 'react';
import { useTodos } from '../hooks/useTodos';
import { ITask } from '../types';
import { TaskContainer } from './styles/Container.styles';
import TodoItem from './TodoItem';

const TodoList: React.FC = () => {
  const { data: taskList } = useTodos();
  return (
    <TaskContainer>
      {taskList?.map((task: ITask) => (
        <TodoItem key={task.id} task={task} />
      ))}
    </TaskContainer>
  );
};

export default TodoList;
