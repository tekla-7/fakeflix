import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getLink'
})
export class GetLinkPipe implements PipeTransform {
  // Trending Now
  // Top Rated On Fakeflix
  // Tv Series Airing Today 
  // IMDb Top Rated Movies
  // Upcoming Movies
  // <li><a routerLink="/home" routerLinkActive="router-active">Home</a></li>
  // <li><a routerLink="/type/tv-series" routerLinkActive="router-active">TV Series</a></li>
  // <li><a routerLink="/type/movies" routerLinkActive="router-active">Movies</a></li>
  // <li><a routerLink="/type/popular" routerLinkActive="router-active">New & Popular</a></li>
  // <li><a routerLink="/home">My list</a></li>
  transform(value: string): string {
    let result =''
    value = value.toLowerCase().trim();
    switch(value ) {
      case 'trending now':
      case 'top rated on fakeflix' :
        result = '/type/popular'
        break;
      case  'tv series airing today' :
        result  = '/type/tv-series'
        break;
      case 'imdb top rated movies' :
      case 'upcoming movies': 
        result ='/type/movies'
        break;
      default :
        result = '/home'
    }
    return result  ;
  }

}
