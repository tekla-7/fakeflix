import { Component, OnDestroy, OnInit } from '@angular/core';
import { MoviesListService } from '../../core/service/movies-list.service';
import { MoviesDescription } from '../../core/interfaces/movies-description';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable, Subject, takeUntil } from 'rxjs';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

@Component({
  selector: 'app-tv-series',
  templateUrl: './tv-series.component.html',
  styleUrl: './tv-series.component.scss',
})
export class TVSeriesComponent implements OnInit, OnDestroy {
  moviesList: MoviesDescription[] = [];
  list: MoviesDescription[] = [];
  showError: boolean = false;
  error: string = '';
  showCard: boolean = false;
  showElement: any;
  backgroundImg: SafeStyle = '';
  text: string = '';
  private _destroy$ = new Subject();
  constructor(
    private moviesService: MoviesListService,
    private activatedRoute: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) {}
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      if (params['name'] == 'movies') {
        // this.backgroundImg = '/s5znBQmprDJJ553IMQfwEVlfroH.jpg';
        this.text = 'Movies on Fakefilx :';
        this.handleMovies();
      } else if (params['name'] == 'tv-series') {
        // this.backgroundImg = '/7cqKGQMnNabzOpi7qaIgZvQ7NGV.jpg';
        this.text = 'TV Shows on Fakefilx :';
        this.handleTvSeries();
      } else if (params['name'] == 'popular') {
        this.text = 'Most Popular TV & Movies Right Now : ';
        // this.backgroundImg='/9l1eZiJHmhr5jIlthMdJN5WYoff.jpg'
        this.handlePopular();
      }
     
  
    });
   
  }
  showDescription(ID: number) {
    console.log(ID);
    this.showCard = true;
    this.showElement = this.list.find((element) => element.id == ID);
  }
  hideCard(hidde: boolean) {
    this.showCard = hidde;
  }
  handleBackgroun(id: number) {
    let url = `https://image.tmdb.org/t/p/original${this.moviesList[id].backdrop_path}`;
    this.backgroundImg = this.sanitizer.bypassSecurityTrustStyle(`url(${url})`);
  }
  private handleTvSeries() {
    this.list = [];
    this.moviesService
      .getTvPopular()
      .pipe(takeUntil(this._destroy$))
      .subscribe({
        next: (data) => {
          this.moviesList = data;
        },
        error: (error: string) => {
          (this.showError = true), (this.error = error);
        },
      });

    this.handleSubscribe(this.moviesService.getTvPopularList());
    this.handleSubscribe(this.moviesService.getTv());
  }
  private handleMovies() {
    this.list = [];
    this.moviesService
      .getMoviePopular()
      .pipe(takeUntil(this._destroy$))
      .subscribe({
        next: (data) => {
          this.moviesList = data;
        },
        error: (error: string) => {
          (this.showError = true), (this.error = error);
        },
      });
    this.handleSubscribe(this.moviesService.getTopRate());
    this.handleSubscribe(this.moviesService.getMovies());
  }
  private handlePopular() {
    this.list = [];
    this.moviesService
      .getallTrebding()
      .pipe(takeUntil(this._destroy$))
      .subscribe({
        next: (data) => {
          this.moviesList = data;
        },
        error: (error: string) => {
          (this.showError = true), (this.error = error);
        },
      });
    this.handleSubscribe(this.moviesService.getTrebding());
    this.handleSubscribe(this.moviesService.getMovies());
    // this.handleSubscribe(this.moviesService.getMoviePopular());
  }
  private handleSubscribe(element: Observable<any>) {
    element.pipe(takeUntil(this._destroy$)).subscribe({
      next: (data: []) => {
        this.list = [...this.list, ...data];
        this.backgroundImg=this.list[0].backdrop_path;
        let url = `https://image.tmdb.org/t/p/original${this.backgroundImg}`;
        this.backgroundImg = this.sanitizer.bypassSecurityTrustStyle(`url(${url})`);
      },
      error: (error: string) => {
        (this.showError = true), (this.error = error);
      },
    });
  }
  ngOnDestroy(): void {
    this._destroy$.next(true);
    this._destroy$.complete();
    this._destroy$.unsubscribe();
  }
}
