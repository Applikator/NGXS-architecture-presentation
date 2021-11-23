import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { CounterState } from './state/counter.state';
import { Observable } from 'rxjs';
import { CounterActions } from './state/counter.actions';

@Component({
  selector: 'app-root',
  template: `
    <div class="row">
      <div class="column">
        <div class="row"><h1>Counter</h1></div>
        <div class="row count">{{ count$ | async }}</div>
        <div class="row">
          <button (click)="decrement()">-</button>
          <button (click)="increment()">+</button>
          <button (click)="reset()">0</button>
        </div>
        <div class="row">{{ count$ | async }} is {{ (isEven$ | async) ? 'even' : 'odd' }}</div>
      </div>
    </div>
  `,
  styles: [
    `
      .count {
        margin: 10px;
        font-size: 80px;
      }
      button {
        margin: 10px;
        font-size: 30px;
        width: 40px;
      }
    `,
  ],
})
export class AppComponent {
  constructor(private store: Store) {}

  @Select(CounterState.count)
  count$!: Observable<number>;

  @Select(CounterState.isEven)
  isEven$!: Observable<boolean>;

  increment(): void {
    this.store.dispatch(new CounterActions.Add({ value: 1 }));
  }

  decrement(): void {
    this.store.dispatch(new CounterActions.Sub({ value: 1 }));
  }

  reset(): void {
    this.store.dispatch(new CounterActions.Set({ value: 42 }));
  }
}
