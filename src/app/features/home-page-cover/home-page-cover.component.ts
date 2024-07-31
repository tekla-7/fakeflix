import { Component, OnInit } from '@angular/core';
import { MoviesListService } from '../../core/service/movies-list.service';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { MoviesDescription } from '../../core/interfaces/movies-description';

@Component({
  selector: 'app-home-page-cover',
  templateUrl: './home-page-cover.component.html',
  styleUrl: './home-page-cover.component.scss',
})
export class HomePageCoverComponent implements OnInit{
  // movieList: MoviesDescription[] = [];
  // constructor(
  //   private movieslistService: MoviesListService,
  //   private http: HttpClient
  // ) {
  //   this.movieslistService
  //     .getMovies()
  //     .subscribe((data) => (this.movieList = data 
  //   ));
  // }
 
  ngOnInit(): void {
      // console.log("thissss"+this.movieList)
  }

}
