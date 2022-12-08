import { useEffect, useState } from 'react';
import { getTasks } from '../api';
import { ITask } from '../types';

interface IGetBody {
  data: ITask[];
  setData: React.Dispatch<React.SetStateAction<ITask[]>>;
  error: null;
}

export const useFetch = (): IGetBody => {
  const [data, setData] = useState<ITask[]>([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getTasks()
      .then((res) => setData(res.data))
      .catch((error) => setError(error));
  }, []);
  return { data, setData, error };
};
