import React from 'react';
import { HandleDelete, ITask } from '../types';
import { MdDeleteOutline } from 'react-icons/md';
import { AiOutlineCheckCircle } from 'react-icons/ai';

interface TaskProps {
  task: ITask;
  handleDelete: HandleDelete;
}

const TodoItem: React.FC<TaskProps> = ({ task, handleDelete }) => {
  const onDelete = (): void => {
    console.log(`delete: ${task.id}`);
    handleDelete(task.id);
  };
  return (
    <div className="todo-items">
      <h4 data-testid={task.id}>{task.name}</h4>
      <button onClick={onDelete}>
        <MdDeleteOutline />
      </button>
      <button>
        <AiOutlineCheckCircle />
      </button>
    </div>
  );
};

export default TodoItem;
