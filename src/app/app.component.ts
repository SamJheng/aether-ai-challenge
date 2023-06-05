import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ToDoService } from './service/to-do.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
import { TodoObject } from './interfaces/type';
import { BehaviorSubject, Subject, of, switchMap, take } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'aetherAI-challenge';
  formGroup: FormGroup ;
  todoListEach: TodoObject[] = [];
  subject = new BehaviorSubject(1);
  constructor(
    private toDoService: ToDoService,
    private formBuilder: FormBuilder
  ){
    this.formGroup = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required]
    });
    this.getTodoListEach().subscribe(list=>{
      this.todoListEach = list;
    })
    this.updateTodoListEach()
  }
  get titleControl(): FormControl {
    return this.formGroup.get('title') as FormControl;
  }
  get descriptionControl(): FormControl {
    return this.formGroup.get('description') as FormControl;
  }
  async addItemToList(){
    const now = new Date().getTime();
    const uid = uuidv4();

    if (this.formGroup.valid) {
      await this.toDoService.addItem({
        title: this.titleControl.value,
        description:this.descriptionControl.value,
        create_at: now,
        iscompleted:false,
        id: uid
      });
      console.log(uid)
      this.updateTodoListEach();
      console.log(uid)
    }
  }
  async removeItembyId(obj: TodoObject){
    const key = obj.id || null;
    if (key) {
      await this.toDoService.removeItem(key);
      this.updateTodoListEach();
    }
  }
  async updateCompleted(obj: TodoObject, completed:boolean){
    const key = obj.id || null;
    if (key) {
      const item = await this.toDoService.getItemByID(key);
      if (item.iscompleted !== completed) {
        item.iscompleted = completed
      }
      await this.toDoService.updateItem(key, item);
      this.updateTodoListEach();
    }
  }
  async updateDesc(obj: TodoObject, event: Event){
    console.log(event)
    const key = obj.id || null;
    const target = event.target as HTMLInputElement;
    if (key) {
      const item = await this.toDoService.getItemByID(key);
      item.description = target.value;
      await this.toDoService.updateItem(key, item);
      this.updateTodoListEach();
    }
  }
  async updateTodoListEach(){
    this.subject.next(1);
  }
  getTodoListEach(){
    return this.subject.pipe(
      switchMap(async item=>{
        return (await this.toDoService.getAllItem());
      })
    )
  }
  setTodoItem(){

  }
}
