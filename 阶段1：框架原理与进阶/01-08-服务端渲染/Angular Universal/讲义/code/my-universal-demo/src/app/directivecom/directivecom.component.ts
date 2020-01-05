import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-directivecom',
  templateUrl: './directivecom.component.html',
  styleUrls: ['./directivecom.component.css']
})
export class DirectivecomComponent implements OnInit {

  isShow: boolean = false
  teacherList = ['jack', 'rose', 'neil']
  isActive: boolean = true
  getColor() {
    return this.isActive ? 'red' : 'gray'
  }
  constructor() { }

  ngOnInit() {
  }

}
