import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-todo-list-header',
  template: `
    <header class="header">
      <h1>todos</h1>
      <input
        class="new-todo"
        placeholder="What needs to be done?"
        #todo
        (keyup.enter)="addTodoRequested.emit({ title: todo.value }); todo.value = ''"
        autofocus
      />
    </header>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoListHeaderComponent {
  @Output() addTodoRequested = new EventEmitter<{ title: string }>();
}
