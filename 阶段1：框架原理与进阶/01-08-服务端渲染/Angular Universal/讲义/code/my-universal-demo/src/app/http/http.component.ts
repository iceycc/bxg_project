import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-http',
  templateUrl: './http.component.html',
  styleUrls: ['./http.component.css']
})
export class HttpComponent implements OnInit {
  movieList: any

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get('http://localhost:3301/in_theaters')
      .subscribe(res => {
        console.log(res);
        this.movieList = res
      })
  }

}
