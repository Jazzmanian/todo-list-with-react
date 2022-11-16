import React from 'react';
import { ITask } from '../Interfaces';

interface TaskProps {
  task: ITask;
}

const TodoItem = ({ task }: TaskProps): JSX.Element => {
  return <div key={task.id}>{task.name}</div>;
};

export default TodoItem;
