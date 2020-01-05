import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router'
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-moviedetail',
  templateUrl: './moviedetail.component.html',
  styleUrls: ['./moviedetail.component.css']
})
export class MoviedetailComponent implements OnInit {
  type: string
  id: number
  movieDetail: any

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.type = params['type']
      this.id = params['id']
      this.http.get(`http://localhost:3301/${this.type}/${this.id}?_embed=details`)
        .subscribe(res => {
          console.log(res);
          this.movieDetail = res
        })
    })
  }

}
