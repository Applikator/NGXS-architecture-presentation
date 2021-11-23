import { FilterMode } from '../models/filter';
import { ITodo, Todo } from '../models/todo';

export namespace TodoActions {
  const group = '[Todo]';

  export class Add {
    constructor(public payload: { title: string }) {}
    static type = `${group} Add`;
  }

  export class Update {
    constructor(public payload: ITodo) {}
    static type = `${group} Update`;
  }

  export class Toggle {
    constructor(public payload: { id: number }) {}
    static type = `${group} Toggle`;
  }

  export class ToggleAll {
    constructor(public payload: { completed: boolean }) {}
    static type = `${group} Toggle All`;
  }

  export class Delete {
    constructor(public payload: { id: number }) {}
    static type = `${group} Delete`;
  }

  export class DeleteCompleted {
    constructor(public payload: void) {}
    static type = `${group} Delete Completed`;
  }

  export class Filter {
    constructor(public payload: { mode: FilterMode }) {}
    static type = `${group} Filter`;
  }
}
