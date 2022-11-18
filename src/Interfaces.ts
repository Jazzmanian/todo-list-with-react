export interface ITask {
  id: number;
  name: string;
  completed: boolean;
}

export interface AddTodo {
  (newTodo: string): void;
}
