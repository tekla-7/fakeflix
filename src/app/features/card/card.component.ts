import { Component, EventEmitter, input, Input, Output } from '@angular/core';
import { MoviesDescription } from '../../core/interfaces/movies-description';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
  
})
export class CardComponent {
  @Input() movie!: MoviesDescription ;
  @Input() tvStyle:boolean =false;
  @Input() tvHeader:boolean =false;


  @Input() index:number=0;
  @Output() movieId=new EventEmitter<{ id: number, index: number }>()
  @Output() ID=new EventEmitter<number>()
  constructor() {}
  sendMovieId(){
    this.ID.emit(this.movie.id)
    this.movieId.emit({ id: this.movie.id, index: this.index} )
  }

}
