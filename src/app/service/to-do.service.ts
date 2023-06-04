import { Injectable } from '@angular/core';
import { LocalStorageService } from 'ngx-localstorage';
import { TodoObject } from '../interfaces/type';
import { StorageMap } from '@ngx-pwa/local-storage';
import { Observable, firstValueFrom, lastValueFrom, of, switchMap } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ToDoService {
  private todolist: TodoObject[] = [];
  primaryKey = 'todo-list';
  constructor(private readonly lss: LocalStorageService, private storage: StorageMap) {
    this.checkInstanceAndCreate();
  }
  async checkInstanceAndCreate(){
    const td = await lastValueFrom(this.storage.has(this.primaryKey));
    if (!td) {
      await lastValueFrom(this.storage.set(this.primaryKey, []))
    }
  }
  async addItem(value: TodoObject):Promise<boolean>{
    try {
      const list = await this.getAllItem();
      list.push(value);
      console.log(list)
      await lastValueFrom(this.storage.set(this.primaryKey, list));
      return true;
    } catch (error) {
      console.error(error)
      return false;
    }
  }
  async getItemByID(id: string): Promise<TodoObject>{
    const list = await this.getAllItem();
    const item = list.find(i=>i.id===id);
    return item as TodoObject;
  }
  async removeItem(id: string){
    try {
      const list = await this.getAllItem();
      const delet_list = list.filter((i) => i.id !== id);
      await lastValueFrom(this.storage.set(this.primaryKey, delet_list));
      return true;
    } catch (error) {
      return false;
    }
  }
  async updateItem(id: string, value: TodoObject){
    try {
      const list = await this.getAllItem();
      const index = list.findIndex(i => i.id === id);
      if (index !== -1) {
        list[index] = value;
      }
      await lastValueFrom(this.storage.set(this.primaryKey, list));
      return true;
    } catch (error) {
      return false;
    }
  }

  async getAllItem():Promise< TodoObject[]>{
    const list = await lastValueFrom(this.storage.get(this.primaryKey)) || [];
    return list as TodoObject[];
  }
}
