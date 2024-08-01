import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { MoviesDescription } from '../../../core/interfaces/movies-description';
import { MoviesListService } from '../../../core/service/movies-list.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-slider-list',
  templateUrl: './slider-list.component.html',
  styleUrl: './slider-list.component.scss',
})
export class SliderListComponent {
  array: [{ title: string; array: MoviesDescription[] }] = [
    { title: '', array: [] },
  ];
  positionX: number = 0;
  dotList: number[] = [];
  cardWidth: number = 0;
  dot: number = 1;

  constructor(
    private movieslistService: MoviesListService,
    private http: HttpClient
  ) {
    this.movieslistService.getMovies().subscribe((data) => {
      this.array[0].title = 'Trending Now';
      this.array[0].array = data;
      // this.cardWidth =
      //   window.innerWidth * 0.2226 > 317.16
      //     ? 317.16
      //     : window.innerWidth * 0.2226;
      // this.dot = Math.round(
      //   (this.cardWidth * this.movieList.length) /
      //     (window.innerWidth - (window.innerWidth * 8) / 100)
      // );
      // this.dotList = new Array(this.dot).fill(0);
      // console.log(
      //   'this  ' +
      //     Math.round(
      //       (this.cardWidth * this.movieList.length) / window.innerWidth
      //     )
      // );
    });
    this.movieslistService.getSeries().subscribe((data) => {
      let obj = { title: 'Top Rated on Fakeflix', array: data };
      this.array.push(obj);
      
    });
  }

  @HostListener('window:resize', ['$event'])
  ngOnInit(): void {}
}
