import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Subscription, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Task } from '../models/task.inteface';
import { AngularFireAuth } from '@angular/fire/auth';



@Injectable({
  providedIn: 'root'
})
export class DataService {
  private notesCollection: AngularFirestoreCollection<Task>;
  // notes$: Observable<Note[]>;
  public notes$ = new BehaviorSubject<Task[]>([]);
  private uid: string;
  private authStatus: Subscription;
  private ncSub: Subscription;
  taskList:Array<Task> = new Array();
  list$ = new BehaviorSubject<Task[]>( this.taskList ) ;

  constructor(private afs: AngularFirestore, private afauth: AngularFireAuth) {
    // get the user auth status
    this.loadData().then((data:Array<Task>) => {
      data.forEach((item) => {
        this.taskList.push(item)
      })
      this.list$.next( this.taskList );
    })
    this.list$.next( this.taskList );
    this.authStatus = afauth.authState.subscribe((user) => {
      if (user) {
        // get the user id
        this.uid = user.uid;
        // create path
        const path = `notes/${this.uid}/usernotes`;
        // set the collection
        this.notesCollection = afs.collection<Task>(path);
        // this.notes$ = this.getNotes();
        this.ncSub = this.getNotes().subscribe((data) => {
          this.notes$.next(data);
        });
      }
      else{
        this.ncSub.unsubscribe();
      }
    });
  }
  addToList( task:Task ) {
    this.taskList.push( task );
    this.list$.next( this.taskList );
    this.saveData();
  }
  deleteFromList( id:number ) {
    this.taskList.forEach( (task:Task, index ) => {
      if( task.start == id ) {
        this.taskList.splice( index, 1 );
      }
    });
    this.list$.next( this.taskList );
  }
  setCompleted(id:number){
    this.taskList.forEach( (task:Task, index ) => {
      if( task.start == id ) {
        if(task.completed){
          task.completed = false;
        }
        else{
          task.completed = true;
        }
      }
    });
  }
  saveData() {
    let data = JSON.stringify( this.taskList );
    try {
      window.localStorage.setItem("tasks" , data );
      if( !window.localStorage.getItem("tasks") ) {
        throw("local storage not available");
      }
    }
    catch( exc ) {
      console.log( exc );
    }
  }

  loadData() {
    return new Promise( (resolve,reject) => {
      if( !window.localStorage.getItem("tasks") ) {
        reject( false );
      }
      else{
        let data = JSON.parse( window.localStorage.getItem("tasks") );
        resolve( data );
      }
    } );
  }
  addNote(data: Task) {
    this.notesCollection.add(data);
  }

  getNotes() {
    // this function retuns an Observable
    return this.notesCollection.snapshotChanges()
      .pipe( map(actions => actions.map(a => {
          const data = a.payload.doc.data() as Task;
          const id = a.payload.doc.id;
          return { id, ...data };
        }))
      );
  }

  updateNote( note ) {
    this.notesCollection.doc( note.id ).update( {name: note.name, note: note.note });
  }

  deleteNote( id ) {
    this.notesCollection.doc( id ).delete();
  }

  getUid() {
    return this.uid;
  }
}
