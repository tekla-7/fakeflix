import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import {
  catchError,
  elementAt,
  find,
  map,
  Observable,
  tap,
  throwError,
} from 'rxjs';
import { MoviesDescription } from '../interfaces/movies-description';
import { CoreGetResponse } from '../interfaces/GetMoviesResponse';

@Injectable({
  providedIn: 'root',
})
export class MoviesListService {
  constructor(private http: HttpClient) {}

  //get movies
  getMovies(): Observable<MoviesDescription[]> {
    return this.http
      .get<CoreGetResponse>(
        'https://api.themoviedb.org/3/discover/movie?api_key=1c275a06a98f5d7bc288046c3456a78b'
      )
      .pipe(
        map((element) => element.results),
        catchError(this.handleError),
        map((element) => this.handleData(element))
      );
  }

  getTopRate() : Observable<MoviesDescription[]>{
    return this.http
      .get<CoreGetResponse>(
        'https://api.themoviedb.org/3/movie/top_rated?api_key=1c275a06a98f5d7bc288046c3456a78b'
      )
      .pipe(
        map((element) => element.results),
        catchError(this.handleError),
        map((element) => this.handleData(element))
      );
  }
  getUpcoming(): Observable<MoviesDescription[]> {
    return this.http
      .get<CoreGetResponse>(
        'https://api.themoviedb.org/3/movie/upcoming?api_key=1c275a06a98f5d7bc288046c3456a78b'
      )
      .pipe(
        map((element) => element.results),
        catchError(this.handleError),
        map((element) => this.handleData(element))
      );
  }

  //get tv series
  getTvPopularList() : Observable<MoviesDescription[]>{
    return this.http
      .get<CoreGetResponse>(
        'https://api.themoviedb.org/3/trending/tv/week?api_key=1c275a06a98f5d7bc288046c3456a78b'
      )
      .pipe(
        map((element) => element.results),
        catchError(this.handleError),
        map((element) => this.handleData(element))
      );
  }
  getSeries(): Observable<MoviesDescription[]> {
    return this.http
      .get<CoreGetResponse>(
        'https://api.themoviedb.org/3/discover/tv?api_key=1c275a06a98f5d7bc288046c3456a78b'
      )
      .pipe(
        map((element) => element.results),
        catchError(this.handleError),
        map((element) => this.handleData(element))
      );
  }
  getTvseries() : Observable<MoviesDescription[]>{
    return this.http
      .get<CoreGetResponse>(
        'https://api.themoviedb.org/3/tv/airing_today?api_key=1c275a06a98f5d7bc288046c3456a78b'
      )
      .pipe(
        map((element) => element.results),
        catchError(this.handleError),
        map((element) => this.handleAllData(element))
      );
  }
  getTv() : Observable<MoviesDescription[]>{
    return this.http
      .get<CoreGetResponse>(
        'https://api.themoviedb.org/3/discover/tv?include_adult=true&include_null_first_air_dates=false&language=en-US&page=5&sort_by=popularity.desc&api_key=1c275a06a98f5d7bc288046c3456a78b'
      )
      .pipe(
        map((element) => element.results),
        catchError(this.handleError),
        map((element) => this.handleData(element))
      );
  }
  getTrebding(): Observable<MoviesDescription[]> {
    return this.http
      .get<CoreGetResponse>(
        'https://api.themoviedb.org/3/trending/all/week?language=en-US&api_key=1c275a06a98f5d7bc288046c3456a78b'
      )
      .pipe(
        map((element) => element.results),
        catchError(this.handleError),
        map((element) => this.handleData(element))
      );
  }
  //type/:name page bg elements
  getTvPopular(): Observable<MoviesDescription[]> {
    return this.http
      .get<CoreGetResponse>(
        'https://api.themoviedb.org/3/trending/tv/week?api_key=1c275a06a98f5d7bc288046c3456a78b'
      )
      .pipe(
        map((element) => element.results),
        catchError(this.handleError),
        map((element) => this.handleAllData(element))
      );
  }
  getMoviePopular() : Observable<MoviesDescription[]>{
    return this.http
      .get<CoreGetResponse>(
        'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1&api_key=1c275a06a98f5d7bc288046c3456a78b'
      )
      .pipe(
        map((element) => element.results),
        catchError(this.handleError),
        map((element) => this.handleAllData(element))
      );
  }
  getallTrebding() : Observable<MoviesDescription[]>{
    return this.http
      .get<CoreGetResponse>(
        'https://api.themoviedb.org/3/trending/all/week?language=en-US&api_key=1c275a06a98f5d7bc288046c3456a78b'
      )
      .pipe(
        map((element) => element.results),
        catchError(this.handleError),
        map((element) => this.handleAllData(element))
      );
  }
  ///handler
  private handleData(elements: MoviesDescription[]) {
    {
      let arr: MoviesDescription[] = elements.map((el) => {
        return {
          backdrop_path: el.backdrop_path,
          id: el.id,
          genre_ids: [...el.genre_ids],
          original_language: el.original_language,
          overview: el.overview,
          release_date: el.first_air_date as string,
          vote_average: el.vote_average,
          origin_country: el.origin_country,
          adult: el.adult,
          original_name: el.original_name,
          popularity: el.popularity,
          first_air_date: el.first_air_date,
          title: el.title ? el.title : (el.name as string),
        };
      });

      return arr;
    }
  }
  private handleAllData(elements: MoviesDescription[]) {
    {
      let arr: MoviesDescription[] = elements.map((el) => {
        return {
          poster_path: el.poster_path as string,
          backdrop_path: el.backdrop_path,
          id: el.id,
          genre_ids: [...el.genre_ids],
          original_language: el.original_language,
          overview: el.overview,
          release_date: el.first_air_date as string,
          vote_average: el.vote_average,
          origin_country: el.origin_country,
          adult: el.adult,
          original_name: el.original_name,
          popularity: el.popularity,
          first_air_date: el.first_air_date,
          title: el.title ? el.title : (el.name as string),
        };
      });

      return arr;
    }
  }
  private handleError(errorResponse: HttpErrorResponse) {
    let errorMessage = 'Something Went Wrong Try Again';
    return throwError(() => errorMessage);
  }
}
