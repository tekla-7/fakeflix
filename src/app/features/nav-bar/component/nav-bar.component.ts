import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, ElementRef, HostListener, Renderer2 } from '@angular/core';
import { AuthService } from '../../first-page/service/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
  animations: [
    trigger('widthChange', [
      state(
        'collapsed',
        style({
          width: '0px',
          opacity: 0,
          overflow: 'hidden',
        })
      ),
      state(
        'expanded',
        style({
          width: '200px',
          opacity: 1,
          overflow: 'hidden',
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
export class NavBarComponent {
  isExpanded = false;
  isShow = false;
  showSignOut = false;
  constructor(
    private ElementRef: ElementRef,
    private renderer: Renderer2,
    private authService: AuthService
  ) {}
  showMenu() {
    this.isShow = !this.isShow;
  }
  toggleWidth() {
    this.isExpanded = !this.isExpanded;
  }
  showdropdown() {
    this.showSignOut = !this.showSignOut;
  }
  signOut() {
    this.showSignOut = !this.showSignOut;
    this.authService.signout();
  }

  @HostListener('window:scroll')
  onWindowScroll() {
    let header =
      this.ElementRef.nativeElement.getElementsByClassName('header-container');
    let headerTablet =
      this.ElementRef.nativeElement.getElementsByClassName('header-discover');
    if (window.scrollY > 70) {
      header[0].classList.add('scroll');
      headerTablet[0].classList.add('scroll');
    } else {
      header[0].classList.remove('scroll');
      headerTablet[0].classList.remove('scroll');
    }
  }
}
