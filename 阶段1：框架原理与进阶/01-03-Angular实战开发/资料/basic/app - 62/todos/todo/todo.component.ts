import { Component, OnInit, OnChanges } from '@angular/core'

import { TodosService } from '../todos.service'

// 创建接口
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
  todos: Todo[] = []

  // 父组件完成数据添加操作
  addTodo(todoName: string) {
    this.todosService.addTodo(todoName).subscribe((todo: Todo) => {
      this.todos.push(todo)
    })
  }

  // 删除任务
  delTodo(id: number) {
    this.todosService.delTodo(id).subscribe(() => {
      // const curIndex: number = this.todos.findIndex(todo => todo.id === id)
      // this.todos.splice(curIndex, 1)
      this.todos = this.todos.filter(todo => todo.id !== id)
    })
  }

  // 切换任务状态
  changeTodo(id: number) {
    // 根据id获取到当前任务的状态
    const curTodo: Todo = this.todos.find(todo => todo.id === id)

    this.todosService.changeTodo(id, !curTodo.done).subscribe((todo: Todo) => {
      curTodo.done = todo.done
    })
  }

  // 钩子函数
  // 放初始化逻辑代码
  ngOnInit() {
    this.todosService.getTodos().subscribe((todos: Todo[]) => {
      this.todos = [...todos]
    })
  }

  ngOnChanges() {}
}
