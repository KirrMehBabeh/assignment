import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { CreatetaskPage } from '../createtask/createtask.page';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';

import { Subscription } from 'rxjs';
import { Task } from '../../models/task.inteface';
import { DataService } from '../data.service';
import { AngularFireAuth } from '@angular/fire/auth';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  taskForm:FormGroup;
  startTime:number;
  list:Array<Task> = [];
  listSub:Subscription;
  completed:boolean;

  constructor(
    private modal: ModalController,
    private auth: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private afAuth: AngularFireAuth,
    private dataService:DataService) {}
  ngOnInit() {
      this.listSub = this.dataService.list$.subscribe( taskData => this.list = taskData );
  }
  delete( itemStart ) {
    this.dataService.deleteFromList( itemStart );
  }

  completeTask(itemStart){
    this.dataService.setCompleted( itemStart );
    
  }
  async addTask() {
    const createTaskModal = await this.modal.create({
      component: CreatetaskPage
    });
    createTaskModal.onDidDismiss().then((response) => {
      
    })
    await createTaskModal.present();
  }
  signOut() {
    this.afAuth.auth.signOut().then(()=>{
      // redirect user to signin page
      this.router.navigate(['/signin'])
    })
  }
}
