import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NoteDetailPageRoutingModule } from './note-detail-routing.module';

import { NoteDetailPage } from './note-detail.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    NoteDetailPageRoutingModule
  ],
  declarations: [NoteDetailPage]
})
export class NoteDetailPageModule {}
