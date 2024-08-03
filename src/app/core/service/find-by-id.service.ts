import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, of, tap, throwError } from 'rxjs';
import { MoviesDescription } from '../interfaces/movies-description';

@Injectable({
  providedIn: 'root',
})
export class FindByIdService {
  constructor(private http: HttpClient) {}
  // findById(ID: string) {
   
  //   return this.findMovie(ID).pipe(
  //     tap((el) => {
  //       if (el) {
  //         return el;
  //       } 
  //       return this.findTv(ID);
        
  //     })
  //   );
   
  // }


findById(id:string){
  return this.http.get<any>(`https://api.themoviedb.org/3/find/${id}?api_key=1c275a06a98f5d7bc288046c3456a78b&external_source=imdb_id`)
}



  private findMovie(id: any) {
    return this.http
      .get<any>(
        `https://api.themoviedb.org/3/movie/${id}?api_key=1c275a06a98f5d7bc288046c3456a78b`
      )
      .pipe(
        map((response) => response),
        catchError(() => of(null))
      );
  }
  private findTv(id: any) {
    return this.http
      .get<any>(
        `https://api.themoviedb.org/3/tv/${id}?api_key=1c275a06a98f5d7bc288046c3456a78b`
      )
      .pipe(
        map((response) => response),
        catchError(() => of(null))
      );
  }
  private handleData(el: any) {
    let title = el.title ? el.title : el.name;
    let obj: MoviesDescription = {
      backdrop_path: el.backdrop_path,
      id: el.id,
      genre_ids: [...el.genre_ids],
      original_language: el.original_language,
      overview: el.overview,
      release_date: el.first_air_date,
      vote_average: el.vote_average,
      title: title,
    };
    return obj;
  }
  private handleError(errorResponse: HttpErrorResponse) {
    let errorMessage = 'Something Went Wrong Try Again';
    return throwError(() => errorResponse);
  }
}
