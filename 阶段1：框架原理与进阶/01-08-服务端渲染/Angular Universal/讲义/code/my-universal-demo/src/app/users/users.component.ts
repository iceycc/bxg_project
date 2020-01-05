import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  userList = [
    {name: 'jack1', id: 1},
    {name: 'jack2', id: 2},
    {name: 'jack3', id: 3}
  ]

  constructor(private router: Router) { }

  ngOnInit() {
  }
  jump() {
    // 跳转到home
    this.router.navigate(['/home'])
  }
  jumpToDetail(id) {
    this.router.navigate(['/users/detail', id])
  }

}
