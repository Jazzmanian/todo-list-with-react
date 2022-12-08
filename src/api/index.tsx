import { ITask } from '../types';
import axios from 'axios';

const client = axios.create({
  baseURL: process.env.REACT_APP_BASEURL,
});

export const getTasks = async (): Promise<any> => {
  const res = await client.get('');
  return res.data;
};

export const deleteTask = async (id: number): Promise<null> => {
  const res = await client.delete(`/${id}`);
  return res.data;
};

export const postTasks = async (todo: string): Promise<ITask> => {
  const response = await client.post('', {
    name: todo.trim(),
    completed: false,
  });
  return response.data;
};
export const putTask = async (task: ITask): Promise<ITask> => {
  const res = await client.put(`/${task.id}`, {
    name: task.name,
    completed: !task.completed,
  });
  return res.data;
};
