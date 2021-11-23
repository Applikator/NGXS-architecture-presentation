import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, StateOperator } from '@ngxs/store';
import { ITodo, Todo } from '../models/todo';
import { Filter, FilterMode } from '../models/filter';
import { TodoActions } from './todo.actions';
import { patch } from '@ngxs/store/operators';

export interface TodoStateModel {
  currentTodo: ITodo | null;
  snapshot: ITodo | null;
  filter: FilterMode;
  todos: ITodo[];
  lastId: number;
}

const defaults = {
  currentTodo: null,
  snapshot: null,
  filter: FilterMode.ALL,
  todos: [],
  lastId: 0,
};

@State<TodoStateModel>({
  name: TodoState.featureName,
  defaults,
})
@Injectable()
export class TodoState {
  static readonly featureName = 'todo';

  @Selector()
  static filteredTodos(stateModel: TodoStateModel): ITodo[] {
    return stateModel.todos.filter((it) => Filter.passes(it, stateModel.filter));
  }
  @Selector()
  static filter(stateModel: TodoStateModel): FilterMode {
    return stateModel.filter;
  }
  @Selector()
  static total(stateModel: TodoStateModel): number {
    return stateModel.todos.length;
  }
  @Selector()
  static completed(stateModel: TodoStateModel): number {
    return stateModel.todos.filter((it) => it.completed).length;
  }
  @Selector()
  static remaining(stateModel: TodoStateModel): number {
    return stateModel.todos.filter((it) => !it.completed).length;
  }
  @Selector([TodoState.remaining])
  static allCompleted(remaining: number): boolean {
    return remaining === 0;
  }

  @Action(TodoActions.Add)
  protected add(context: StateContext<TodoStateModel>, action: TodoActions.Add): void {
    const title = action.payload.title.trim();
    if (title.length === 0) {
      return;
    }

    const lastId = context.getState().lastId;
    const existingTodos = context.getState().todos;

    if (title.length === 0) {
      return;
    }

    const newId = lastId + 1;
    const newTodo = Todo(newId, title);

    context.patchState({
      todos: [...existingTodos, newTodo],
      lastId: newId,
    });
  }

  @Action(TodoActions.Update)
  protected update(context: StateContext<TodoStateModel>, action: TodoActions.Update): void {
    context.setState(
      patch({
        todos: update(action.payload.id, (it) => {
          it.title = action.payload.title;
          it.completed = action.payload.completed;
        }),
      })
    );
  }

  @Action(TodoActions.Toggle)
  protected toggle(context: StateContext<TodoStateModel>, action: TodoActions.Toggle): void {
    context.setState(
      patch({
        todos: update(action.payload.id, (it) => (it.completed = !it.completed)),
      })
    );
  }

  @Action(TodoActions.ToggleAll)
  protected toggleAll(context: StateContext<TodoStateModel>, action: TodoActions.ToggleAll): void {
    const toggled = context
      .getState()
      .todos.map((it) => ({ ...it, completed: action.payload.completed }));
    context.patchState({
      todos: toggled,
    });
  }

  @Action(TodoActions.Delete)
  protected delete(context: StateContext<TodoStateModel>, action: TodoActions.Delete): void {
    const remaining = context.getState().todos.filter((it) => it.id !== action.payload.id);
    context.patchState({
      todos: remaining,
    });
  }

  @Action(TodoActions.DeleteCompleted)
  protected deleteCompleted(context: StateContext<TodoStateModel>): void {
    const remaining = context.getState().todos.filter((it) => !it.completed);
    context.patchState({
      todos: remaining,
    });
  }

  @Action(TodoActions.Filter)
  protected filter(context: StateContext<TodoStateModel>, action: TodoActions.Filter): void {
    context.patchState({
      filter: action.payload.mode,
    });
  }
}

function update(id: number, change: (it: ITodo) => void): StateOperator<ITodo[]> {
  return (existing: Readonly<ITodo[]>) => {
    const toUpdate = existing.find((it) => it.id === id);
    if (!toUpdate) {
      return [...existing];
    }

    const updated = { ...toUpdate };
    change(updated);

    const remaining = existing.filter((it) => it.id !== toUpdate.id);
    return [...remaining, updated];
  };
}
