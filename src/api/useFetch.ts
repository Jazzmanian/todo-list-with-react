import axios from 'axios';
import { useEffect, useState } from 'react';
import { AddTodo, HandleDelete, ITask, ToggleComplete } from '../types';

interface APIBody {
  data: ITask[];
  loading: boolean;
  error: null;
  addTodo: AddTodo;
  handleDelete: HandleDelete;
  toggleComplete: ToggleComplete;
}

export const useFetch = (url: string): APIBody => {
  const [data, setData] = useState<ITask[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get(url)
      .then((res) => setData(res.data))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, [url]);

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

  return { data, loading, error, addTodo, handleDelete, toggleComplete };
};
