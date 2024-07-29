import {
  animate,
  query,
  stagger,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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
  ],
})
export class FirstPageComponent implements OnInit {
  text = 'Sign In';
  question = "Haven't you registered yet ?";
  isVisible = true;
  SignInForm : FormGroup=new FormGroup({
    'email':new FormControl(null,[Validators.required, Validators.email]),
    'password':new FormControl(null ,[Validators.required]),
  });
  SignUpForm : FormGroup=new FormGroup({
    'name':new FormControl(null,[Validators.required]),
    'email':new FormControl(null,[Validators.required, Validators.email]),
    'password':new FormControl(null ,[Validators.required]),
    "confirmPassword":new FormControl(null ,[Validators.required]),
  });
  constructor() {}

  ngOnInit(): void {
    
  }
  SignInSubmit(){
    if(this.SignInForm.valid){
   console.log("submiitt" +this.SignInForm.get('email')?.value)   
    }
    
  }
  SignUpSubmit(){
    console.log("submiitt" +this.SignUpForm.get('email')?.value)   
  }
  ShowSignUp() {
    this.question = this.isVisible
      ? 'Do you already have an accaunt ?'
      : "Haven't you registered yet ?";
    this.text = this.isVisible ? 'Sign Up' : 'Sign In';
    this.isVisible = !this.isVisible;
  }
}
