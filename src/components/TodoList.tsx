import React from 'react';
import { useQuery } from 'react-query';
import { getTasks } from '../api';
import { ITask } from '../types';
import { TaskContainer } from './styles/Container.styles';
import TodoItem from './TodoItem';

const TodoList: React.FC = () => {
  const { data: taskList } = useQuery('todos', getTasks);
  return (
    <TaskContainer>
      {taskList?.map((task: ITask) => (
        <TodoItem key={task.id} task={task} />
      ))}
    </TaskContainer>
  );
};

export default TodoList;
