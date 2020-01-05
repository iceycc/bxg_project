import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { TodosHeaderComponent } from './todos-header/todos-header.component'
import { TodosListComponent } from './todos-list/todos-list.component'
import { TodoComponent } from './todo/todo.component'

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [TodosHeaderComponent, TodosListComponent, TodoComponent],
  exports: [TodoComponent]
})
export class TodosModule {}
