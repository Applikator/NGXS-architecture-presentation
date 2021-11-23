import { Action, Selector, State, StateContext } from '@ngxs/store';
import { CounterActions } from './counter.actions';
import { Injectable } from '@angular/core';

export interface CounterStateModel {
  count: number;
}

const defaults: CounterStateModel = {
  count: 0,
};

@State<CounterStateModel>({
  name: CounterState.featureName,
  defaults,
})
@Injectable()
export class CounterState {
  static featureName = 'counter';

  @Selector()
  static count(stateModel: CounterStateModel): number {
    return stateModel.count;
  }

  @Selector([CounterState.count])
  static isEven(count: number): boolean {
    return Math.abs(count % 2) === 0;
  }

  @Action(CounterActions.Add)
  protected add(context: StateContext<CounterStateModel>, action: CounterActions.Add): void {
    context.patchState({
      count: context.getState().count + action.payload.value,
    });
  }

  @Action(CounterActions.Sub)
  protected sub(context: StateContext<CounterStateModel>, action: CounterActions.Add): void {
    context.patchState({
      count: context.getState().count - action.payload.value,
    });
  }

  @Action(CounterActions.Set)
  protected set(context: StateContext<CounterStateModel>, action: CounterActions.Add): void {
    context.patchState({
      count: action.payload.value,
    });
  }
}
