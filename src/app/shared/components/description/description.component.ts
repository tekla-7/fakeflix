import { Component, Input, Output, EventEmitter } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { MoviesDescription } from '../../../core/interfaces/movies-description';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrl: './description.component.scss',
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
export class DescriptionComponent {
  @Input() showElement!: MoviesDescription;
  @Input() showCard: boolean = false;
  @Output() closeCard = new EventEmitter<boolean>();

  hideCard() {
    this.showCard = false;
    this.closeCard.emit(false);
  }
}
