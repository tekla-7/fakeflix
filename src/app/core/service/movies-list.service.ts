import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { catchError, elementAt, find, map, tap, throwError } from 'rxjs';
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
        map((element) => this.handleData(element))
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
        map((element) => this.handleData(element))
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
          let arr: MoviesDescription[] = [];
          for (let el of element) {
            let obj: MoviesDescription = {
              backdrop_path: el.backdrop_path,
              id: el.id,
              genre_ids: [...el.genre_ids],
              original_language: el.original_language,
              overview: el.overview,
              release_date: el.first_air_date,
              vote_average: el.vote_average,
              title: el.name,
              poster_path: el.poster_path,
              origin_country: el.origin_country,
              adult: el.adult,
              original_name: el.original_name,
              popularity: el.popularity,
              first_air_date: el.first_air_date,
            };

            arr.push(obj);
          }
          return arr;
        })
      );
  }
  getTopRate() {
    return this.http
      .get<any>(
        'https://api.themoviedb.org/3/movie/top_rated?api_key=1c275a06a98f5d7bc288046c3456a78b'
      )
      .pipe(
        map((element) => element.results),
        catchError(this.handleError),
        map((element) => this.handleData(element))
      );
  }
  getUpcoming() {
    return this.http
      .get<any>(
        'https://api.themoviedb.org/3/movie/upcoming?api_key=1c275a06a98f5d7bc288046c3456a78b'
      )
      .pipe(
        map((element) => element.results),
        catchError(this.handleError),
        map((element) => this.handleData(element))
      );
  }
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
      // let arr: MoviesDescription[] = [];
      // for (let el of elements) {
      //   let title = el.title ? el.title : el.name;
      //   let obj: MoviesDescription = {
      //     backdrop_path: el.backdrop_path,
      //     id: el.id,
      //     genre_ids: [...el.genre_ids],
      //     original_language: el.original_language,
      //     overview: el.overview,
      //     release_date: el.first_air_date as string,
      //     vote_average: el.vote_average,
      //     title: title || '',
      //     origin_country: el.origin_country,
      //     adult: el.adult,
      //     original_name: el.original_name,
      //     popularity: el.popularity,
      //     first_air_date: el.first_air_date,
      //   };

      // arr.push(obj);
      // }

      return arr;
    }
  }
  private handleError(errorResponse: HttpErrorResponse) {
    let errorMessage = 'Something Went Wrong Try Again';
    return throwError(() => errorMessage);
  }
}
// https://api.themoviedb.org/3/movie/{id}?api_key=1c275a06a98f5d7bc288046c3456a78b faindd
// https://api.themoviedb.org/3/tv/211089?api_key=1c275a06a98f5d7bc288046c3456a78b   tv ser
//https://api.themoviedb.org/3/find/121361?api_key=1c275a06a98f5d7bc288046c3456a78b&external_source=tvdb_id
