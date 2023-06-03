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
  constructor(private readonly lss: LocalStorageService, private storage: StorageMap) {

  }

  async addItem(key: string, value: TodoObject):Promise<boolean>{
    try {
      await lastValueFrom(this.storage.set(key, value));
      return true;
    } catch (error) {
      return false;
    }
  }
  async readItemByKey(key: string): Promise<TodoObject>{
    const item = await lastValueFrom(this.storage.get(key));
    return item as TodoObject;
  }
  async removeItem(key: string){
    try {
      const d = await lastValueFrom(this.storage.delete(key));
      return true;
    } catch (error) {
      return false;
    }
  }
  async updateItem(key: string, value: TodoObject){
    try {
      await lastValueFrom(this.storage.set(key, value));
      return true;
    } catch (error) {
      return false;
    }
  }

  getAllItem(){

    return this.storage.keys().pipe(
      switchMap(async (k)=>{
        this.todolist = [];
        const i = await this.readItemByKey(k) as TodoObject;
        console.log(i)
        this.todolist.push({id:k,...i})
        return this.todolist;
      })
    )
  }
  async getCount(){
    return await lastValueFrom(this.storage.size);
  }
}
