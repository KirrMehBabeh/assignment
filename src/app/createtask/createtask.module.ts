import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreatetaskPageRoutingModule } from './createtask-routing.module';

import { CreatetaskPage } from './createtask.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    CreatetaskPageRoutingModule
  ],
  declarations: [CreatetaskPage]
})
export class CreatetaskPageModule {}
