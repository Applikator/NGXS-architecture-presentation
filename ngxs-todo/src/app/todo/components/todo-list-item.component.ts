import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ITodo, Todo } from '../models/todo';

@Component({
  selector: 'app-todo-list-item',
  template: `
    <li [ngClass]="{ completed: todo.completed, editing: todo.id === editedTodo?.id }">
      <div class="view">
        <input
          class="toggle"
          type="checkbox"
          (change)="toggleRequested.emit()"
          [checked]="todo.completed"
        />
        <label *ngIf="editedTodo?.id !== todo.id" (dblclick)="beginEditRequested.emit()">{{
          todo.title
        }}</label>
        <button (click)="deleteRequested.emit()" class="destroy"></button>
      </div>
      <input
        *ngIf="editedTodo && editedTodo.id === todo.id"
        [(ngModel)]="editedTodo.title"
        (keyup.enter)="confirmEditRequested.emit()"
        (keyup.esc)="cancelEditRequested.emit()"
        class="edit"
        autofocus
      />
    </li>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoListItemComponent {
  @Input() todo: ITodo = Todo(0, '');
  @Input() editedTodo: ITodo | null = null;

  @Output() toggleRequested = new EventEmitter<void>();
  @Output() beginEditRequested = new EventEmitter<void>();
  @Output() cancelEditRequested = new EventEmitter<void>();
  @Output() confirmEditRequested = new EventEmitter<void>();
  @Output() deleteRequested = new EventEmitter<void>();
}
