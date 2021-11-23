import { ITodo, Todo } from './todo';

export enum FilterMode {
  ALL = 'SHOW_ALL',
  ACTIVE = 'SHOW_ACTIVE',
  COMPLETED = 'SHOW_COMPLETED',
}

export class Filter {
  static passes(todo: ITodo, filter?: FilterMode): boolean {
    switch (filter) {
      case FilterMode.ACTIVE:
        return !todo.completed;
      case FilterMode.COMPLETED:
        return todo.completed;
      case FilterMode.ALL:
      default:
        return true;
    }
  }
}
