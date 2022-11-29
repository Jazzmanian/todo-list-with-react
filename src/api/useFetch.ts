import axios from 'axios';
import { useEffect, useState } from 'react';
import { AddTodo, ITask } from '../types';

interface APIBody {
  data: ITask[];
  loading: boolean;
  error: null;
  addTodo: AddTodo;
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

  return { data, loading, error, addTodo };
};
