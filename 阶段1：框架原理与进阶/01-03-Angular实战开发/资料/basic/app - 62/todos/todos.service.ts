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
    return this.http.get<Todo[]>(this.todosUrl)
  }

  // 添加数据
  addTodo(todoName: string) {
    return this.http.post<Todo>(this.todosUrl, {
      name: todoName,
      done: false
    })
  }

  // 切换任务状态
  changeTodo(id: number, done: boolean) {
    return this.http.patch<Todo>(`${this.todosUrl}/${id}`, {
      done
    })
  }

  // 删除任务
  delTodo(id: number) {
    return this.http.delete<object>(`${this.todosUrl}/${id}`)
  }
}
