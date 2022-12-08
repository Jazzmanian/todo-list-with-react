import { useEffect, useState } from 'react';
import { getTasks } from '../api';
import { ITask } from '../types';

interface IgetBody {
  data: ITask[];
  setData: any;
  error: null;
}

export const useFetch = (url: string): IgetBody => {
  const [data, setData] = useState<ITask[]>([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getTasks()
      .then((res) => setData(res.data))
      .catch((error) => setError(error));
  }, [url]);
  return { data, setData, error };
};
