import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http'
import { AppComponent } from './app.component';
import { PriorityFormComponent } from './components/priority-form/priority-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListStatesComponent } from './components/list-states/list-states.component';
import { AppRoutingModule } from './app-routing.module';
import { FiftyStatesListComponent } from './components/fifty-states-list/fifty-states-list.component';
import { DetailStateComponent } from './components/detail-state/detail-state.component';

@NgModule({
  declarations: [
    AppComponent,
    PriorityFormComponent,
    ListStatesComponent,
    FiftyStatesListComponent,
    DetailStateComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
