import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
// @Injectable()
export class TodosService {
  constructor() {}

  // 提供一个方法
  todoTest() {
    console.log('测试TodosService服务')
  }
}
