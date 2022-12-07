import React, { useEffect, useState } from 'react';
import { getTasks } from '../api/api';
import { ITask } from '../types';

export const useFetch = (url: string) => {
  const [data, setData] = useState<ITask[]>([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getTasks()
      .then((res) => setData(res.data))
      .catch((error) => setError(error));
  }, [url]);
  return { data, setData, error };
};
