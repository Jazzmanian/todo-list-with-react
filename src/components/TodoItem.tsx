import React from 'react';
import { HandleDelete, ITask, ToggleComplete } from '../types';
import { MdDeleteOutline } from 'react-icons/md';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { deleteTask, putTask } from '../api';

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
    deleteTask(task.id)
      .then(() => handleDelete(task.id))
      .catch((error) => console.log(error));
  };
  const onCheck = (): void => {
    putTask(task)
      .then(() => toggleComplete(task.id))
      .catch((error) => console.log(error));
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
