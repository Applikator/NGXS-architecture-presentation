export interface ITodo {
  id: number;
  title: string;
  completed: boolean;
}

export function Todo(id: number, title: string, completed?: boolean): ITodo {
  return { id, title, completed: completed ?? false };
}
