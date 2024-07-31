import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { elementAt, map, tap } from 'rxjs';
import { MoviesDescription } from '../interfaces/movies-description';

@Injectable({
  providedIn: 'root',
})
export class MoviesListService {
  constructor(private http: HttpClient) {}
  getMovies() {
    return this.http
      .get<any>(
        'https://api.themoviedb.org/3/discover/movie?api_key=1c275a06a98f5d7bc288046c3456a78b'
      )
      .pipe(
        map((element) => element.results),
        map((element) => {
          let arr :MoviesDescription[]= [];
          for (let el of element) {
            let obj:MoviesDescription = {
              backdrop_path: el.backdrop_path,
              id: el.id,
              genre_ids: [...el.genre_ids],
              original_language: el.original_language,
              overview: el.overview,
              release_date: el.release_date,
              vote_average: el.vote_average,
              title:el.title
            };
            arr.push(obj);
          }
          return arr;
        })
      );
  }
}
