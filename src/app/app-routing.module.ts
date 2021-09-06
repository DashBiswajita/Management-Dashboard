import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddListComponent } from './add-list/add-list.component';
import { AppComponent } from './app.component';
import { ListComponent } from './list/list.component';

const routes: Routes = [
  {path: 'add', component: AddListComponent},
  {path: 'list', component: ListComponent},
  {path:'', redirectTo: 'list', pathMatch: 'full'},
  {path: '**',redirectTo: 'list',pathMatch : 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
