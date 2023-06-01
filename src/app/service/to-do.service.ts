import { Injectable } from '@angular/core';
import { LocalStorageService } from 'ngx-localstorage';
import { TodoObject } from '../interfaces/type';

@Injectable({
  providedIn: 'root'
})
export class ToDoService {

  constructor(private lss: LocalStorageService) { }

  addItem(key: string, value: TodoObject):boolean{
    try {
      this.lss.set<TodoObject>(key, value);
      return true;
    } catch (error) {
      return false;
    }
  }
  readItemByKey(key: string){
    const item = this.lss.get<TodoObject>(key);
    return item;
  }
  removeItem(key: string){
    try {
      this.lss.remove(key);
      return true;
    } catch (error) {
      return false;
    }
  }
  updateItem(key: string, value: TodoObject){
    try {
      this.lss.set<TodoObject>(key, value);
      return true;
    } catch (error) {
      return false;
    }
  }
}
