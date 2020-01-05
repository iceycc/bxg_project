import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router'
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-movielist',
  templateUrl: './movielist.component.html',
  styleUrls: ['./movielist.component.css']
})
export class MovielistComponent implements OnInit {
  type: string
  movieList: any

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.type = params['type'];
      this.http.get(`http://localhost:3301/${this.type}`).subscribe(res => {
        console.log(res);
        this.movieList = res
      })
    })
  }
  // 跳转到电影详情
  jumpToDetail(id, type) {
    this.router.navigate([`/movie/${type}/${id}`])
  }

}
