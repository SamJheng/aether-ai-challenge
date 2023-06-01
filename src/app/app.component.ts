import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ToDoService } from './service/to-do.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
import { TodoObject } from './interfaces/type';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'aetherAI-challenge';
  formGroup: FormGroup ;
  todoListEach: TodoObject[] = []
  constructor(
    private toDoService: ToDoService,
    private formBuilder: FormBuilder
  ){
    this.formGroup = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required]
    });
    this.setAllTodoList();
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
        iscompleted:true
      })
    }
  }
  get todoList(): TodoObject[]{
    return this.toDoService.getAllItem() as TodoObject[];
  }
  setAllTodoList(){

    for (const item of this.todoList) {
      this.todoListEach.push(item)
    }
  }
}
