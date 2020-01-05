import { Component, OnInit, Output, EventEmitter } from '@angular/core'

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnInit {
  constructor() {}

  // 1 创建事件
  @Output()
  getMoney = new EventEmitter()

  handleClick() {
    // 3 触发事件
    this.getMoney.emit('孩子问爸爸要1000块钱')
  }

  ngOnInit() {}
}
