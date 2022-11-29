import React from 'react';
import { HandleDelete, ITask, ToggleComplete } from '../types';
import { MdDeleteOutline } from 'react-icons/md';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import axios from 'axios';

interface TaskProps {
  task: ITask;
  handleDelete: HandleDelete;
  toggleComplete: ToggleComplete;
}

const TodoItem: React.FC<TaskProps> = ({
  task,
  handleDelete,
  toggleComplete,
}) => {
  const onDelete = (): void => {
    axios
      .delete(`http://localhost:8080/tasks/${task.id}`)
      .then(() => handleDelete(task.id))
      .catch((error) => console.log(error));
  };
  const onCheck = (): void => {
    toggleComplete(task.id);
  };
  return (
    <div className="todo-item">
      <h4
        data-testid={task.id}
        aria-label={task.completed ? 'complete' : 'incomplete'}
        className={task.completed ? 'complete' : 'incomplete'}
      >
        {task.name}
      </h4>
      <button aria-label="delete-btn" onClick={onDelete}>
        <MdDeleteOutline />
      </button>
      <button aria-label="check-btn" onClick={onCheck}>
        <AiOutlineCheckCircle />
      </button>
    </div>
  );
};

export default TodoItem;
