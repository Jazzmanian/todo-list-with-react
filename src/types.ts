export interface ITask {
  id: number;
  name: string;
  completed: boolean;
}

export type AddTodo = (newTodo: ITask) => void;
export type HandleDelete = (id: number) => void;
export type ToggleComplete = (id: number) => void;
