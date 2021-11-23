export namespace CounterActions {
  const group = '[Counter]';

  export class Add {
    constructor(public payload: { value: number }) {}
    static type = `${group} Add`;
  }
  export class Sub {
    constructor(public payload: { value: number }) {}
    static type = `${group} Sub`;
  }
  export class Set {
    constructor(public payload: { value: number }) {}
    static type = `${group} Set`;
  }
}
