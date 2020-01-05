import { Component, OnInit, OnChanges } from '@angular/core'

import { TodosService } from '../todos.service'

// 创建接口
// interface Todo {
//   id: number
//   name: string
//   done: boolean
// }
import { Todo } from '../todo'

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit, OnChanges {
  // 不要在 constructor 中放一些逻辑代码
  // 只应该提供属性或提供组件使用的服务
  constructor(private todosService: TodosService) {}

  // 任务列表
  // todos: Todo[] = [
  //   { id: 1, name: '吃饭', done: true },
  //   { id: 2, name: '休息', done: false },
  //   { id: 3, name: '学习Angular', done: false }
  // ]
  todos: Todo[] = []

  // 父组件完成数据添加操作
  addTodo(todoName: string) {
    this.todosService.addTodo(todoName)
  }

  // 删除任务
  delTodo(id: number) {
    this.todosService.delTodo(id)
  }

  // 切换任务状态
  changeTodo(id: number) {
    this.todosService.changeTodo(id)
  }

  // 钩子函数
  // 放初始化逻辑代码
  ngOnInit() {
    // console.log('todo ngOnInit')
    this.todos = this.todosService.getTodos()
  }

  ngOnChanges() {}
}
