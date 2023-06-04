import { TestBed } from '@angular/core/testing';

import { ToDoService } from './to-do.service';
import { LocalStorageDirective } from 'ngx-localstorage';
import { TodoObject } from '../interfaces/type';

describe('ToDoService', () => {
  let service: ToDoService;
  const uuid_add = '6d8717c6-f8ec-4fa0-9e97-ce98c194dd22';
  const uuid_remove = '1e37ca80-1f01-416d-86aa-3bc19fa12993';
  const uuid_update = '02292ce0-2f5a-4779-a24b-e70fdeb43e32';
  const curDate = new Date().getTime();
  const addObj: TodoObject = {
    title:'a test add',
    description: 'A challenge',
    iscompleted:false,
    create_at: curDate,
    id: uuid_add
  };
  const removeObj: TodoObject = {
    title: 'a test del',
    description: 'A challenge',
    iscompleted: false,
    create_at: curDate,
    id: uuid_remove
  };
  const updateObj: TodoObject = {
    title: 'a test update',
    description: 'A challenge',
    iscompleted: false,
    create_at: curDate,
    id: uuid_update
  };
  const updateObj_updated: TodoObject = {
    title: 'a test ii',
    description: 'A challenge ii',
    iscompleted: false,
    create_at: curDate,
    id: uuid_update
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        LocalStorageDirective
      ]
    });
    service = TestBed.inject(ToDoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have add testObj as read testObj', async () => {
    const c = await service.addItem(addObj)
    expect(c).toBeTrue()
    const r = await service.getItemByID(uuid_add);
    console.log(r)
    expect(r).toEqual(addObj);
  });

  it('should have remove testObj as null', async () => {
    const c = await service.addItem(removeObj)
    const d = await service.removeItem(uuid_remove)
    const r = await service.getItemByID(uuid_add);
    expect(r).toBeUndefined()
  });

  it('should have update testObj as updated value', async () => {
    const c = await service.addItem(updateObj)
    expect(c).toBeTrue();
    const u = await service.updateItem(uuid_update,updateObj_updated)
    const r = await service.getItemByID(uuid_update);
    expect(r).toEqual(updateObj_updated);
  });

  afterEach(() => {
    service.removeItem(uuid_add)
    service.removeItem(uuid_update)
  })
});
