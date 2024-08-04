import {
  animate,
  query,
  stagger,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { error } from 'console';
import { Observable, Subject, takeUntil } from 'rxjs';
import { AuthResponseData } from '../../../core/interfaces/AuthResponse-Data';
import { passwordvalidator } from '../service/passwordconfirm-validator';

@Component({
  selector: 'app-first-page',
  templateUrl: './first-page.component.html',
  styleUrl: './first-page.component.scss',
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        query(
          '.fadeInAnimation',
          [
            style({ opacity: 0, transform: 'translateY(20px)' }),
            stagger('150ms', [
              animate(
                '300ms ease-out',
                style({ opacity: 1, transform: 'translateY(0)' })
              ),
            ]),
          ],
          { optional: true }
        ),
      ]),
    ]),
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
export class FirstPageComponent implements OnInit, OnDestroy {
  error: string = '';
  showError: boolean = false;
  timeout: any;
  isLoading = false;
  text = 'Sign In';
  text2 = 'Sign Up';
  question = "Haven't you registered yet ?";
  isVisible = true;
  SignInForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(2),
    ]),
  });
  SignUpForm: FormGroup = new FormGroup(
    {
      name: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(2),
      ]),
      confirmPassword: new FormControl(null, [
        Validators.required,
        Validators.minLength(2),
      ]),
    },
    {
      validators: passwordvalidator,
    }
  );
  private _destroy$ = new Subject();
  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {}

  SignInAnonymously() {
    clearTimeout(this.timeout);
    this.isLoading = true;
    this.authObservable(
      this.authService.signin('anonymous@gmail.com', 'anonymous123')
    );
  }

  SignInSubmit() {
    this.handleFormSubmit(this.SignInForm, 'signin');
  }
  SignUpSubmit() {
    this.handleFormSubmit(this.SignUpForm, 'signup');
  }
  ShowSignUp() {
    clearTimeout(this.timeout);
    this.showError = false;

    this.question = this.isVisible
      ? 'Do you already have an accaunt ?'
      : "Haven't you registered yet ?";
    this.text = this.isVisible ? 'Sign Up' : 'Sign In';
    this.text2 = this.isVisible ? 'Sign In' : 'Sign Up';
    this.isVisible = !this.isVisible;
  }

  private handleFormSubmit(form: FormGroup, sign: any) {
    let email = form.get('email')?.value;
    let password = form.get('password')?.value;
    this.isLoading = true;
    if (form.valid) {
      const authServuceMethod =
        sign === 'signin'
          ? this.authService.signin(email, password)
          : this.authService.signup(email, password);
      this.authObservable(authServuceMethod);
    } else {
      this.error = 'Invalid data Please enter valid data';
      this.showError = true;
      this.isLoading = false;
      this.handleShowError();
    }
  }
  private authObservable(auth: Observable<AuthResponseData>) {
    clearTimeout(this.timeout);
    this.showError = false;

    auth.pipe(takeUntil(this._destroy$)).subscribe({
      next: (resData) => {
        this.isLoading = false;
        this.router.navigate(['/home']);
      },
      error: (errorRes) => {
        this.error = errorRes;
        this.showError = true;
        this.handleShowError();
        this.isLoading = false;
      },
    });
  }

  private handleShowError() {
    this.timeout = setTimeout(() => {
      this.showError = false;
    }, 3000);
  }

  get emailCtrl(): AbstractControl {
    return this.SignInForm.get('email') as AbstractControl;
  }
  get passwordCtrl(): AbstractControl {
    return this.SignInForm.get('password') as AbstractControl;
  }
  get passwordUpCtrl(): AbstractControl {
    return this.SignUpForm.get('password') as AbstractControl;
  }
  get emaildUpCtrl(): AbstractControl {
    return this.SignUpForm.get('email') as AbstractControl;
  }
  get confirmPasswordUpCtrl(): AbstractControl {
    return this.SignUpForm.get('confirmPassword') as AbstractControl;
  }
  get namedUpCtrl(): AbstractControl {
    return this.SignUpForm.get('name') as AbstractControl;
  }
  ngOnDestroy(): void {
    this._destroy$.next(true);
    this._destroy$.complete();
    this._destroy$.unsubscribe();
  }
}
