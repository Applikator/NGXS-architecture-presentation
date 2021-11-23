import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FilterMode } from '../models/filter';

@Component({
  selector: 'app-todo-list-footer',
  template: `
    <footer *ngIf="total > 0" class="footer">
      <span class="todo-count">
        <strong>{{ remaining }} / {{ total }}</strong>
        left
      </span>
      <ul class="filters">
        <li *ngFor="let it of filterModes">
          <a
            (click)="filterRequested.emit({ mode: it.mode })"
            [ngClass]="{ selected: it.mode === filterMode }"
          >
            {{ it.title }}
          </a>
        </li>
      </ul>

      <button
        *ngIf="completed > 0"
        class="clear-completed"
        (click)="deleteCompletedRequested.emit()"
      >
        Clear completed
      </button>
    </footer>
  `,
  styles: [
    `
      a:hover {
        cursor: pointer;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoListFooterComponent {
  @Input() total = 0;
  @Input() remaining = 0;
  @Input() completed = 0;
  @Input() filterMode = FilterMode.ALL;

  @Output() filterRequested = new EventEmitter<{ mode: FilterMode }>();
  @Output() deleteCompletedRequested = new EventEmitter<void>();

  filterModes = [
    { mode: FilterMode.ALL, title: 'All' },
    { mode: FilterMode.ACTIVE, title: 'Active' },
    { mode: FilterMode.COMPLETED, title: 'Completed' },
  ];
}
