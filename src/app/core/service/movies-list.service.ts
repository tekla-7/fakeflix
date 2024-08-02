import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { catchError, elementAt, map, tap, throwError } from 'rxjs';
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
        catchError(this.handleError),
        map((element) =>this.handleData(element))
      );
  }
 
  getSeries() {
    return this.http
      .get<any>(
        'https://api.themoviedb.org/3/discover/tv?api_key=1c275a06a98f5d7bc288046c3456a78b'
      )
      .pipe(
        map((element) => element.results),
        catchError(this.handleError),
        map((element) =>this.handleData(element))
      );
  }
  getTvseries() {
    return this.http
      .get<any>(
        'https://api.themoviedb.org/3/tv/airing_today?api_key=1c275a06a98f5d7bc288046c3456a78b'
      )
      .pipe(
        map((element) => element.results),
        catchError(this.handleError),
        map((element) => {
          let arr :MoviesDescription[]= [];
          for (let el of element) {
            let obj:MoviesDescription = {
              backdrop_path: el.backdrop_path,
              id: el.id,
              genre_ids: [...el.genre_ids],
              original_language: el.original_language,
              overview: el.overview,
              release_date: el.first_air_date,
              vote_average: el.vote_average,
              title:el.name,
              poster_path:el.poster_path
            };
           
            arr.push(obj);
          }
          return arr;
        })
      );
  }
  getTopRate(){
    return this.http
      .get<any>(
        'https://api.themoviedb.org/3/movie/top_rated?api_key=1c275a06a98f5d7bc288046c3456a78b'
      )
      .pipe(
        map((element) => element.results),
        catchError(this.handleError),
        map((element) =>this.handleData(element))
      );
  }
  getUpcoming(){
    return this.http
      .get<any>(
        'https://api.themoviedb.org/3/movie/upcoming?api_key=1c275a06a98f5d7bc288046c3456a78b'
      )
      .pipe(
        map((element) => element.results),
        catchError(this.handleError),
        map((element) =>this.handleData(element))
      );
  }
  private handleData(element:any){
     {
          let arr :MoviesDescription[]= [];
          for (let el of element) {
            let title=el.title ?el.title:el.name;
            let obj:MoviesDescription = {
              backdrop_path: el.backdrop_path,
              id: el.id,
              genre_ids: [...el.genre_ids],
              original_language: el.original_language,
              overview: el.overview,
              release_date: el.first_air_date,
              vote_average: el.vote_average,
              title:title ,
              
            };
           
            arr.push(obj);
          }
          return arr;
        }

  }
  private handleError(errorResponse: HttpErrorResponse){
    let errorMessage="Something Went Wrong Try Again"
    return throwError(() => errorMessage);
  }
}
