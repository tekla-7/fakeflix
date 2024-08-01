import { Component, input, Input } from '@angular/core';
import { MoviesDescription } from '../../core/interfaces/movies-description';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  @Input() movie: MoviesDescription = {
    id: 0,
    backdrop_path: '',
    genre_ids: [],
    original_language: '',
    overview: '',
    release_date: '',
    vote_average: 0,
    title:""
  };
  constructor() {
 
  }
}
