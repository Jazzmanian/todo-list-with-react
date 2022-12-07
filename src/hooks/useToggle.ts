import { useFetch } from './useFetch';
import { AddTodo, HandleDelete, ITask, ToggleComplete } from '../types';

interface APIBody {
  data: ITask[];
  error: null;
  addTodo: AddTodo;
  handleDelete: HandleDelete;
  toggleComplete: ToggleComplete;
}

export const useToggle = (url: string): APIBody => {
  const { data, setData, error } = useFetch(url);
  const addTodo: AddTodo = (newTodo) => {
    setData([...data, newTodo]);
  };
  const handleDelete: HandleDelete = (deleteId) => {
    setData(data.filter((task) => task.id !== deleteId));
  };

  const toggleComplete: ToggleComplete = (selectedId) => {
    const updatedTaskList = data.map((task) => {
      if (task.id === selectedId) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setData(updatedTaskList);
  };

  return { data, error, addTodo, handleDelete, toggleComplete };
};
