import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NgxsModule, NoopNgxsExecutionStrategy } from '@ngxs/store';
import { CounterState } from './state/counter.state';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    NgxsModule.forRoot([CounterState], {
      developmentMode: !environment.production,
      selectorOptions: {
        injectContainerState: false,
        suppressErrors: false,
      },
      executionStrategy: NoopNgxsExecutionStrategy,
    }),
    ...environment.imports,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
