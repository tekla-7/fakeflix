import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { MoviesDescription } from '../../../core/interfaces/movies-description';
import { MoviesListService } from '../../../core/service/movies-list.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { error } from 'console';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-slider-list',
  templateUrl: './slider-list.component.html',
  styleUrl: './slider-list.component.scss',
  animations: [
   
    trigger('fade', [
      state(
        'collapsed',
        style({
          opacity: 0,
        })
      ),
      state(
        'expanded',
        style({
          opacity: 1,
        })
      ),
      transition('collapsed <=> expanded', [animate('300ms ease-in-out')]),
    ]),
  ],
})
export class SliderListComponent {
  array: [{ title: string; array: MoviesDescription[] }] = [
    { title: '', array: [] },
  ];
  positionX: number = 0;
  dotList: number[] = [];
  cardWidth: number = 0;
  dot: number = 1;
  showError: boolean = false;
  error: string = '';
  constructor(
    private movieslistService: MoviesListService,
    private http: HttpClient
  ) {
    this.movieslistService.getMovies().subscribe(
      (data) => {
        this.array[0].title = 'Trending Now';
        this.array[0].array = data;
      },
      (error) => {
        (this.showError = true), (this.error = error);
      }
    );

    this.movieslistService.getSeries().subscribe(
      (data) => {
        let obj = { title: 'Top Rated On Fakeflix', array: data };
        this.array.push(obj);
      },
      (error) => {
        (this.showError = true), (this.error = error);
      }
    );

    this.movieslistService.getTvseries().subscribe(
      (data) => {
        let obj = { title: 'Tv Series Airing Today', array: data };
        this.array.push(obj);
      },
      (error) => {
        (this.showError = true), (this.error = error);
      }
    );

    this.movieslistService.getTopRate().subscribe(
      (data) => {
        let obj = { title: 'IMDb Top Rated Movies', array: data };
        this.array.push(obj);
      },
      (error) => {
        (this.showError = true), (this.error = error);
      }
    );

    this.movieslistService.getUpcoming().subscribe(
      (data) => {
        let obj = { title: 'Upcoming Movies', array: data };
        this.array.push(obj);
      },
      (error) => {
        (this.showError = true), (this.error = error);
      }
    );
  }

  // @HostListener('window:resize', ['$event'])
  // ngOnInit(): void {}
}

