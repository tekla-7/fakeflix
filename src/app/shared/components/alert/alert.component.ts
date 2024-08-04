import { animate, query, state, style, transition, trigger } from '@angular/animations';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss',
  animations:[
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
  ]
})
export class AlertComponent {
@Input() message:string='';

}
