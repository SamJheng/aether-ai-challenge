import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ToDoService } from './service/to-do.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
import { TodoObject } from './interfaces/type';
import { BehaviorSubject, Subject, switchMap, take } from 'rxjs';
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
    this.updateTodoListEach()
  }
  get titleControl(): FormControl {
    return this.formGroup.get('title') as FormControl;
  }
  get descriptionControl(): FormControl {
    return this.formGroup.get('description') as FormControl;
  }
  addItemToList(){
    const now = new Date().getTime();
    const uid = uuidv4();
    if (this.formGroup.valid) {
      this.toDoService.addItem(uid,{
        title: this.titleControl.value,
        description:this.descriptionControl.value,
        create_at: now,
        iscompleted:false
      });
      this.updateTodoListEach();
    }
  }
  async removeItembyId(obj: TodoObject){
    const key = obj?.id || null;
    if (key) {

      this.toDoService.removeItem(key);
      this.updateTodoListEach();
      const c = await this.toDoService.getCount();
      if (c === 0) {
        this.todoListEach = [];
      }
    }
  }
  async updateCompleted(obj: TodoObject, completed:boolean){
    console.log(completed)
    const key = obj?.id || null;

    if (key) {
      const item = await this.toDoService.readItemByKey(key);
      if (item.iscompleted !== completed) {
        item.iscompleted = completed
      }
      const u = await this.toDoService.updateItem(key, item);

    }


  }
  updateTodoListEach(){
    this.toDoService.getAllItem().pipe(take(1)).subscribe(list=>{
      this.todoListEach = list;
    })
  }
  getTodoListEach(){
    return this.subject.pipe(
      switchMap(item=>{
        return this.toDoService.getAllItem();
      })
    )
  }
  setTodoItem(){

  }
}
