import {
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { find, Observable, Subject, takeUntil } from 'rxjs';
import { error } from 'console';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { MoviesListService } from '../../../../../core/service/movies-list.service';
import { MoviesDescription } from '../../../../../core/interfaces/movies-description';


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
    trigger('signOut', [
      state(
        'collapsed',
        style({
          opacity: 0,
          overflow: 'hidden',
          transform: 'translateY(100px)',
        })
      ),
      state(
        'expanded',
        style({
          opacity: 1,
          overflow: 'hidden',
          transform: 'translateY(15px)',
        })
      ),
      transition('collapsed <=> expanded', [animate('300ms ease-in-out')]),
    ]),
  ],
})
export class SliderListComponent implements OnDestroy {
  array: [{ title: string; array: MoviesDescription[] }] = [
    { title: '', array: [] },
  ];
  showElement: any;
  positionX: number = 0;
  dotList: number[] = [];
  cardWidth: number = 0;
  dot: number = 1;
  showError: boolean = false;
  error: string = '';
  showCard: boolean = false;
  private _destroy$ = new Subject();
  constructor(
    private movieslistService: MoviesListService,
   
  ) {
    this.movieslistService
      .getMovies()
      .pipe(takeUntil(this._destroy$))
      .subscribe({
        next: (data) => {
          this.array[0].title = 'Trending Now';
          this.array[0].array = data;
        },
        error: (error: string) => {
          (this.showError = true), (this.error = error);
        },
      });

    this.movieslistService
      .getSeries()
      .pipe(takeUntil(this._destroy$))
      .subscribe({
        next:(data) => {
          let obj = { title: 'Top Rated On Fakeflix', array: data };
          this.array.push(obj);
        },
        error:(error) => {
          (this.showError = true), (this.error = error);
        }
      });

    this.movieslistService
      .getTvseries()
      .pipe(takeUntil(this._destroy$))
      .subscribe({
        next:(data) => {
          let obj = { title: 'Tv Series Airing Today', array: data };
          this.array.push(obj);
        },
        error:(error) => {
          (this.showError = true), (this.error = error);
        }
      });

   
    this.movieslistService
      .getTopRate()
      .pipe(takeUntil(this._destroy$))
      .subscribe({
       next: (data) => {
          let obj = { title: 'IMDb Top Rated Movies', array: data };
          this.array.push(obj);
        },
       error: (error) => {
          (this.showError = true), (this.error = error);
        }
      });

    this.movieslistService
      .getUpcoming()
      .pipe(takeUntil(this._destroy$))
      .subscribe({
        next:(data) => {
          let obj = { title: 'Upcoming Movies', array: data };
          this.array.push(obj);
        },
        error:(error) => {
          (this.showError = true), (this.error = error);
        }
      });
  }

  hideCard(hidde: boolean) {
    this.showCard = hidde;
  }

  showDescription(ID: { id: number; index: number }) {
    this.showCard = true;
    this.showElement = this.array[ID.index].array.find(
      (element) => element.id == ID.id
    );
  }

  ngOnDestroy(): void {
    this._destroy$.next(true);
    this._destroy$.complete();
    this._destroy$.unsubscribe();
  }


}
