import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { TodoState } from '../state/todo.state';
import { ITodo } from '../models/todo';
import { FilterMode } from '../models/filter';
import { TodoActions } from '../state/todo.actions';

@Component({
  selector: 'app-todo-page',
  template: `
    <section class="todoapp">
      <app-todo-list-header (addTodoRequested)="add($event.title)"></app-todo-list-header>
      <section *ngIf="(total$ | async)! > 0" class="main">
        <input
          class="toggle-all"
          id="toggle-all"
          type="checkbox"
          #inputToggleAll
          [checked]="allCompleted$ | async"
          (click)="toggleAll(inputToggleAll.checked)"
        />
        <label for="toggle-all">Mark all as complete</label>
        <ul class="todo-list">
          <app-todo-list-item
            *ngFor="let todo of filteredTodos$ | async"
            [todo]="todo"
            [editedTodo]="editedTodo"
            (toggleRequested)="toggle(todo)"
            (beginEditRequested)="beginEdit(todo)"
            (cancelEditRequested)="cancelEdit()"
            (confirmEditRequested)="confirmEdit()"
            (deleteRequested)="delete(todo)"
          >
          </app-todo-list-item>
        </ul>
      </section>
      <app-todo-list-footer
        [total]="(total$ | async)!"
        [completed]="(completed$ | async)!"
        [remaining]="(remaining$ | async)!"
        [filterMode]="(filterMode$ | async)!"
        (filterRequested)="filter($event.mode)"
        (deleteCompletedRequested)="deleteCompleted()"
      >
      </app-todo-list-footer>
    </section>
    <footer class="info">
      <p>Double-click to edit a todo</p>
      <p>Based on <a href="https://todomvc.com">TodoMVC</a></p>
    </footer>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoPageComponent {
  constructor(private store: Store) {}

  @Select(TodoState.filteredTodos)
  filteredTodos$!: Observable<ITodo[]>;

  @Select(TodoState.filter)
  filterMode$!: Observable<FilterMode>;

  @Select(TodoState.completed)
  completed$!: Observable<number>;

  @Select(TodoState.remaining)
  remaining$!: Observable<number>;

  @Select(TodoState.total)
  total$!: Observable<number>;

  @Select(TodoState.allCompleted)
  allCompleted$!: Observable<boolean>;

  editedTodo: ITodo | null = null;

  add(title: string): void {
    this.store.dispatch(new TodoActions.Add({ title }));
  }

  beginEdit(todo: ITodo): void {
    this.editedTodo = { ...todo };
  }

  cancelEdit(): void {
    this.editedTodo = null;
  }

  confirmEdit(): void {
    if (this.editedTodo === null) {
      throw new Error('this.currentTodo is null.');
    }

    this.store.dispatch(new TodoActions.Update(this.editedTodo));
    this.editedTodo = null;
  }

  delete(todo: ITodo): void {
    this.store.dispatch(new TodoActions.Delete({ id: todo.id }));
  }

  toggle(todo: ITodo): void {
    this.store.dispatch(new TodoActions.Toggle({ id: todo.id }));
  }

  toggleAll(completed: boolean): void {
    this.store.dispatch(new TodoActions.ToggleAll({ completed }));
  }

  deleteCompleted(): void {
    this.store.dispatch(new TodoActions.DeleteCompleted());
  }

  filter(mode: FilterMode): void {
    this.store.dispatch(new TodoActions.Filter({ mode }));
  }
}
