import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Subject, tap } from 'rxjs';
import { throwError } from 'rxjs';
import { AuthResponseData } from '../../../core/interfaces/AuthResponse-Data';
import { User } from './user.model';
import { Router } from '@angular/router';
import { userInfo } from 'os';

@Injectable({ providedIn: 'root' })
export class AuthService {
  Timer:any;
  user = new BehaviorSubject<User | null>(null);
  constructor(private http: HttpClient, private router: Router) {}
  signup(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB1IyCnh_OjmioL_tYwenDjTE8o53_vgtI',
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((responsData) => {
          this.handleAuthentication(
            responsData.email,
            responsData.localId,
            responsData.idToken,
            +responsData.expiresIn
          );
        })
      );
  }
  signin(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB1IyCnh_OjmioL_tYwenDjTE8o53_vgtI',
        { email: email, password: password, returnSecureToken: true }
      )
      .pipe(
        catchError(this.handleError),
        tap((responsData) => {
          this.handleAuthentication(
            responsData.email,
            responsData.localId,
            responsData.idToken,
            +responsData.expiresIn
          );
        })
      );
  }
  autoSignIn() {
    let AuthenUserData = localStorage.getItem('AuthenUserData');
    if (!AuthenUserData) {
      return;
    } else {
      let userData: {
        email: string;
        id: string;
        _token: string;
        _tokenExpitationData: Date;
      } = JSON.parse(AuthenUserData);
      const activeUser = new User(
        userData.email,
        userData.id,
        userData._token,
        new Date(userData._tokenExpitationData)
      );
      if (activeUser.token) {
        this.user.next(activeUser);
        const untilTokenExpires=new Date(userData._tokenExpitationData).getTime()-new Date().getTime();
        this.autoSignOut(untilTokenExpires)
      }
    }
  }
  signout() {
    this.user.next(null);
    this.router.navigate(['']);
    localStorage.removeItem('AuthenUserData');
    if(this.Timer){
      clearTimeout(this.Timer)
    }
    this.Timer=null;
  }
  autoSignOut(expirationdate:number){
    this.Timer=setTimeout(()=>{
      this.signout()
    },expirationdate)

  }
  private handleAuthentication(
    email: string,
    localId: string,
    idToken: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, localId, idToken, expirationDate);
    this.user.next(user);
    this.autoSignOut(expiresIn*1000);
    localStorage.setItem('AuthenUserData', JSON.stringify(user));
  }

  private handleError(errorResponse: HttpErrorResponse) {
    let errorMessage = 'An error occurred! Try again';
    if (!errorResponse.error || !errorResponse.error.error) {
      return throwError(() => errorMessage);
    }
    switch (errorResponse.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email exists already';
        break;
      case 'WEAK_PASSWORD : Password should be at least 6 characters':
        errorMessage =
          'The password does not match the requested conditions';
        break;
      case 'EMAIL_NOT_FOUND':
      case 'INVALID_PASSWORD':
        errorMessage='Password or email is incorrect';
    }
   
    return throwError(() => errorMessage);
  }
 
}
