import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { timer, Subscription } from 'rxjs';
import { DataService } from '../data.service';
import { Task } from '../../models/task.inteface';

@Component({
  selector: 'app-createtask',
  templateUrl: './createtask.page.html',
  styleUrls: ['./createtask.page.scss'],
})
export class CreatetaskPage implements OnInit {
  taskForm:FormGroup;
  startTime:number;

  constructor(private modal: ModalController, 
    private formBuilder: FormBuilder,
    private dataService:DataService) { }

  ngOnInit() {
    this.taskForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3) ] ],
      dateComplete: ['', [Validators.required] ]  
     });
  }
  saveTask() {
    this.startTime = new Date().getTime();
    console.log(this.taskForm.get('dateComplete').value);
    let task:Task = {
      name: this.taskForm.get('name').value,
      start: this.startTime,
      dateToComplete: this.taskForm.get('dateComplete').value,
      completed: false
    }
    this.dataService.addToList( task ); 
    this.taskForm.reset();
    this.modal.dismiss( task );
  }
  close() {
    this.taskForm.reset();
    this.modal.dismiss();
  }
}
