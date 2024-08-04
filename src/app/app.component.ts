import { Component, OnInit } from '@angular/core';
import { AuthService } from './features/first-page/service/auth.service';
import { map, take } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'Fakeflix';
  isLoggdIn: boolean = false;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.autoSignIn();
    this.authService.user
      .pipe(
        map((user) => {
          const isAuth = !!user;
          if (isAuth) {
            return true;
          }
          return false;
        })
      )
      .subscribe({
        next: (el: boolean) => {
         this.isLoggdIn=el
        },
      });
  }
}
