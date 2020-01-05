import { Injectable } from '@angular/core'

// 导入HttpClient
import { HttpClient } from '@angular/common/http'

// 创建接口
import { Todo } from './todo'

@Injectable({
  providedIn: 'root'
})
export class TodosService {
  constructor(private http: HttpClient) {}

  todos: Todo[]

  // todos 接口地址
  todosUrl = 'http://localhost:3000/todos'

  // 提供数据
  getTodos() {
    /* const todos: Todo[] = [
      { id: 1, name: '吃饭', done: true },
      { id: 2, name: '休息', done: false },
      { id: 3, name: '学习Angular', done: false },
      { id: 4, name: '学习TS', done: true }
    ]
    this.todos = todos
    return todos */

    return this.http.get<Todo[]>(this.todosUrl)
  }

  // 添加数据
  addTodo(todoName: string) {
    /* // 类型注解
    let id: number

    if (this.todos.length === 0) {
      id = 1
    } else {
      id = this.todos[this.todos.length - 1].id + 1
    }

    this.todos.push({
      id,
      name: todoName,
      done: false
    }) */

    return this.http.post<Todo>(this.todosUrl, {
      name: todoName,
      done: false
    })
  }

  // 切换任务状态
  changeTodo(id: number, done: boolean) {
    /* const curTodo = this.todos.find(todo => todo.id === id)
    curTodo.done = !curTodo.done */

    return this.http.patch<Todo>(`${this.todosUrl}/${id}`, {
      done
    })
  }

  // 删除任务
  delTodo(id: number) {
    /* // 为了不修改 this.todos 的指向，我们修改为另外一种
    // 实现方式
    const curIndex = this.todos.findIndex(todo => todo.id === id)
    this.todos.splice(curIndex, 1) */

    return this.http.delete<object>(`${this.todosUrl}/${id}`)
  }
}
