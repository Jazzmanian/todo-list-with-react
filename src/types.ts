export interface ITask {
  id: number;
  name: string;
  completed: boolean;
}

export type AddTodo = (newTodo: string) => void;
export type HandleDelete = (id: number) => void;
