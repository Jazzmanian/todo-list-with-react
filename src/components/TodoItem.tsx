import React from 'react';
import { ITask } from '../interfaces';
import { MdDeleteOutline } from 'react-icons/md';
import { AiOutlineCheckCircle } from 'react-icons/ai';

interface TaskProps {
  task: ITask;
}

const TodoItem: React.FC<TaskProps> = ({ task }: TaskProps) => {
  return (
    <div className="todo-items">
      <h4>{task.name}</h4>
      <button>
        <MdDeleteOutline />
      </button>
      <button>
        <AiOutlineCheckCircle />
      </button>
    </div>
  );
};

export default TodoItem;
