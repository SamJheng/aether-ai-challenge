import { Injectable } from '@angular/core';
import { LocalStorageService } from 'ngx-localstorage';
import { TodoObject } from '../interfaces/type';

@Injectable({
  providedIn: 'root'
})
export class ToDoService {
  $events: StorageEvent[] = [];
  constructor(private readonly lss: LocalStorageService) {

  }

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
  getLocalStorageService$(){
    return this.lss;
  }
  getAllItem(): TodoObject[]{
    var values = [],
      keys = Object.keys(localStorage),
      i = keys.length;

    while (i--) {
      const s2j = JSON.parse(localStorage.getItem(keys[i]) as string);
      values.push(s2j);
    }

    return values;
  }
}
