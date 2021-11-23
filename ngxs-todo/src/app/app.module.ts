import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { environment } from '../environments/environment';
import { NgxsModule, NoopNgxsExecutionStrategy } from '@ngxs/store';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { TodoState } from './todo/state/todo.state';
import { TodoListHeaderComponent } from './todo/components/todo-list-header.component';
import { TodoListItemComponent } from './todo/components/todo-list-item.component';
import { TodoListFooterComponent } from './todo/components/todo-list-footer.component';
import { TodoPageComponent } from './todo/components/todo-page.component';
import { FooterComponent } from './footer.component';

@NgModule({
  declarations: [
    AppComponent,
    TodoListHeaderComponent,
    TodoListItemComponent,
    TodoListFooterComponent,
    TodoPageComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    NgxsModule.forRoot([TodoState], {
      developmentMode: !environment.production,
      selectorOptions: {
        injectContainerState: false,
        suppressErrors: false,
      },
      executionStrategy: NoopNgxsExecutionStrategy,
    }),
    NgxsStoragePluginModule.forRoot({ key: TodoState.featureName }),
    ...environment.imports,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
