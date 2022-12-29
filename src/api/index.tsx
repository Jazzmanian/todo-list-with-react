import { ITask } from '../types';
import axios, { AxiosResponse } from 'axios';

const client = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

export const getTasks = async (): Promise<ITask[]> => {
  const res = await client.get<ITask[]>('');
  return res.data;
};

export const deleteTask = async (id: number): Promise<AxiosResponse<void>> => {
  return await client.delete(`/${id}`);
};

export const postTasks = async (todo: string): Promise<ITask> => {
  const res = await client.post<ITask>('', {
    name: todo.trim(),
    completed: false,
  });
  return res.data;
};
export const putTask = async (task: ITask): Promise<AxiosResponse<ITask>> => {
  return await client.put<ITask>(`/${task.id}`, {
    name: task.name,
    completed: !task.completed,
  });
};
