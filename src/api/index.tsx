import { ITask } from '../types';
import axios from 'axios';

const client = axios.create({
  baseURL: 'http://localhost:8080/tasks',
  // headers: {
  //   Accept: 'application/json',
  // },
});

export const getTasks = async (): Promise<any> => {
  return await client.get('');
};

export const deleteTask = async (id: number): Promise<null> => {
  return await client.delete(`/${id}`);
};

export const postTasks = async (todo: string): Promise<ITask> => {
  const res = await client.post('', {
    name: todo.trim(),
    completed: false,
  });
  return res.data;
};
export const putTask = async (task: ITask): Promise<ITask> => {
  return await client.put(`/${task.id}`, {
    name: task.name,
    completed: !task.completed,
  });
};
