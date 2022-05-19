import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DetailStateComponent } from "./components/detail-state/detail-state.component";
import { FiftyStatesListComponent } from "./components/fifty-states-list/fifty-states-list.component";
import { ListStatesComponent } from "./components/list-states/list-states.component";
import { PriorityFormComponent } from "./components/priority-form/priority-form.component";

const appRoutes: Routes = [
  { path: '', redirectTo: '/priority', pathMatch: 'full' },
  { path: 'priority', component: PriorityFormComponent },
  { path: 'list', component: ListStatesComponent },
  { path: 'fifty', component: FiftyStatesListComponent },
  { path: 'detail/:id', component: DetailStateComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
