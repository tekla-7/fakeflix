import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
  animations: [
    trigger('widthChange', [
      state('collapsed', style({
        width: '0px',
        opacity:0,
        overflow: 'hidden'
      })),
      state('expanded', style({
        width: '200px',
        opacity:1,
        overflow: 'hidden'
      })),
      transition('collapsed <=> expanded', [
        animate('300ms ease-in-out')
      ]),
    ])
  ]
})
export class NavBarComponent {
  isExpanded = false;
  isShow=false;
  
  showMenu(){
    this.isShow=!this.isShow;
    console.log("clickkk")
  }
  toggleWidth() {
    this.isExpanded = !this.isExpanded;
  }
}
