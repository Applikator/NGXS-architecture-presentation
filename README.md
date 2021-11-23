# NGXS-architecture-presentation
Repository for NGXS architecture presentation by @mykolav.

# Sample projects

- [The folder ngxs-counter](./ngxs-counter) contains a sample counter app based on [NGXS](https://www.ngxs.io/)
- [The folder ngxs-todo](./ngxs-counter) contains a sample todo app based on [NGXS](https://www.ngxs.io/) and [TodoMVC](https://todomvc.com/)

# NGXS

## History

- [Why NGXS was created?](https://medium.com/@amcdnl/why-another-state-management-framework-for-angular-b4b4c19ef664)

## Docs

- [NGXS documentation](https://www.ngxs.io/)
- [NGXS github](https://github.com/ngxs/store)
- [The community resources page](https://www.ngxs.io/community/projects) contains links to multiple [sample projects](https://www.ngxs.io/community/projects#projects) based on on NGXS.

## Performance

NGXS makes it trivial to use [OnPush Change Detection](https://www.thinktecture.com/en/angular/whats-the-hype-onpush/). 

In particular, components in [ngxs-todo](./ngxs-todo) have their `changeDetection` set to `ChangeDetectionStrategy.OnPush`.

## Advanced

- [NGXS State Operators](https://medium.com/ngxs/ngxs-state-operators-8b339641b220)
- [NGXS State Operators docs page](https://www.ngxs.io/advanced/operators)
- [Immer](https://immerjs.github.io/immer/) is an alternative to using state operators.

# Redux

![A Redux diagram](./redux-async-data-flow-diagram.gif)
