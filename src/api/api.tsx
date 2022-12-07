import { ITask } from '../types';
import axios from 'axios';

const client = axios.create({
  baseURL: 'http://localhost:8080/tasks',
});

export async function getTasks(): Promise<any> {
  const res = await client.get('');
  return res.data;
}

export async function deleteTask(id: number): Promise<any> {
  const res = await client.delete(`/${id}`);
  return res.data;
}

export async function postTasks(todo: string): Promise<any> {
  const response = await client.post('', {
    name: todo.trim(),
    completed: false,
  });
  return response.data;
}
export async function putTask(task: ITask): Promise<any> {
  const res = await client.put(`/${task.id}`, {
    name: task.name,
    completed: !task.completed,
  });
  return res.data;
}
