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
  const testObj: TodoObject = {
    title:'a test',
    description: 'A challenge',
    iscompleted:false,
    create_at: curDate
  };
  const testObj_updated: TodoObject = {
    title: 'a test ii',
    description: 'A challenge ii',
    iscompleted: false,
    create_at: curDate
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

  it('should have add testObj as read testObj', () => {
    const c = service.addItem(uuid_add, testObj)
    expect(c).toBeTrue()
    const r = service.readItemByKey(uuid_add);
    expect(r).toEqual(testObj);
  });

  it('should have remove testObj as null', () => {
    const c = service.addItem(uuid_remove, testObj)
    const d = service.removeItem(uuid_remove)
    const r = service.readItemByKey(uuid_add);
    expect(r).toBeNull(testObj);
  });

  it('should have update testObj as updated value', () => {
    const c = service.addItem(uuid_update, testObj)
    expect(c).toBeTrue();
    const u = service.updateItem(uuid_update,testObj_updated)
    const r = service.readItemByKey(uuid_update);
    expect(r).toEqual(testObj_updated);
  });

  afterEach(() => {
    service.removeItem(uuid_add)
    service.removeItem(uuid_update)
  })
});
