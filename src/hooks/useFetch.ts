import axios from 'axios';
import { useEffect, useState } from 'react';
import { AddTodo, HandleDelete, ITask, ToggleComplete } from '../types';

interface APIBody {
  data: ITask[];
  error: null;
  addTodo: AddTodo;
  handleDelete: HandleDelete;
  toggleComplete: ToggleComplete;
}

export const useFetch = (url: string): APIBody => {
  const [data, setData] = useState<ITask[]>([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(url)
      .then((res) => setData(res.data))
      .catch((error) => setError(error));
  }, []);

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
