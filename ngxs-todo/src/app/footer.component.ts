import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FilterMode } from './todo/models/filter';
import { Select, Store } from '@ngxs/store';
import { TodoState } from './todo/state/todo.state';
import { Observable } from 'rxjs';
import { TodoActions } from './todo/state/todo.actions';

@Component({
  selector: 'app-footer',
  template: `
    <footer class="todoapp input-row">
      <input
        class="footer-new-todo"
        placeholder="What needs to be done?"
        #todo
        (keyup.enter)="add(todo.value); todo.value = ''"
        autofocus
      />
    </footer>
    <footer class="toolbar-row">
      <span class="todo-count">
        <strong>{{ remaining$ | async }} / {{ total$ | async }}</strong>
        left
      </span>
      <ul class="filters">
        <li *ngFor="let it of filterModes">
          <a (click)="filter(it.mode)" [ngClass]="{ selected: it.mode === (filterMode$ | async) }">
            {{ it.title }}
          </a>
        </li>
      </ul>

      <button
        *ngIf="(completed$ | async)! > 0"
        class="clear-completed"
        style="margin-right: 35px"
        (click)="deleteCompleted()"
      >
        Clear completed
      </button>
    </footer>
  `,
  styles: [
    `
      .input-row {
        height: 36px;
        text-align: center;
        border-top: 1px solid #e6e6e6;
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
      }

      .footer-new-todo {
        margin: 0;
        width: 100%;
        font-size: 16px;
        box-sizing: border-box;
        padding: 16px 16px 16px 16px;
        height: 20px;
        border: none;
        background: rgba(0, 0, 0, 0.003);
        box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03);
      }

      .input-row input:focus {
        box-shadow: 0 0 2px 2px #cf7d7d;
        outline: 0;
      }

      .toolbar-row {
        padding: 10px 15px;
        height: 20px;
        text-align: center;
        left: 0;
        bottom: 0;
        width: 100%;
        position: fixed;
        background-color: white;
      }

      a:hover {
        cursor: pointer;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  filterModes = [
    { mode: FilterMode.ALL, title: 'All' },
    { mode: FilterMode.ACTIVE, title: 'Active' },
    { mode: FilterMode.COMPLETED, title: 'Completed' },
  ];

  constructor(private store: Store) {}

  @Select(TodoState.filter)
  filterMode$!: Observable<FilterMode>;

  @Select(TodoState.completed)
  completed$!: Observable<number>;

  @Select(TodoState.remaining)
  remaining$!: Observable<number>;

  @Select(TodoState.total)
  total$!: Observable<number>;

  add(title: string): void {
    this.store.dispatch(new TodoActions.Add({ title }));
  }

  filter(mode: FilterMode): void {
    this.store.dispatch(new TodoActions.Filter({ mode }));
  }

  deleteCompleted(): void {
    this.store.dispatch(new TodoActions.DeleteCompleted());
  }
}
