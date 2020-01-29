import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreatetaskPage } from './createtask.page';

const routes: Routes = [
  {
    path: '',
    component: CreatetaskPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreatetaskPageRoutingModule {}
