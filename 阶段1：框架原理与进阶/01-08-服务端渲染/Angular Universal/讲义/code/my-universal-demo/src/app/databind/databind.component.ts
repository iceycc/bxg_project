import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-databind',
  templateUrl: './databind.component.html',
  styleUrls: ['./databind.component.css']
})
export class DatabindComponent implements OnInit {

  msg: string = 'hello itcast!'
  sayHello(msg, evt) {
    console.log(msg)
    console.log(evt)
  }
  constructor() { }

  ngOnInit() {
  }

}
