import axios from 'axios';
import { useEffect, useState } from 'react';
import { ITask } from '../types';

interface APIBody {
  data: ITask[];
  loading: boolean;
  error: null;
}

const useFetch = (url: string): APIBody => {
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

  return { data, loading, error };
};

export default useFetch;
