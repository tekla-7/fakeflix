import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ReactiveFormsModule} from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FirstPageComponent } from './features/first-page/component/first-page.component';
import { NavBarComponent } from './features/nav-bar/component/nav-bar.component';
import { HomePageCoverComponent } from './features/home-page-cover/home-page-cover.component';
import { HttpClientModule } from '@angular/common/http';
import { SliderListComponent } from './features/slider-list/component/slider-list.component';
import { CardComponent } from './features/card/card.component';
import { NextDirective } from './features/slider-list/next.directive';
import { PrevDirective } from './features/slider-list/prev.directive';
import {AngularFireModule} from '@angular/fire/compat';
import { AlertComponent } from './core/component/alert/alert.component';
import { FooterComponent } from './core/component/footer/footer.component'

const firebaseConfig = {
  apiKey: "AIzaSyB1IyCnh_OjmioL_tYwenDjTE8o53_vgtI",
  authDomain: "fakedlix-79236.firebaseapp.com",
  projectId: "fakedlix-79236",
  storageBucket: "fakedlix-79236.appspot.com",
  messagingSenderId: "1063688445035",
  appId: "1:1063688445035:web:a95bc2113744b10678a52e"
};
@NgModule({
  declarations: [
    AppComponent,
    FirstPageComponent,
    NavBarComponent,
    HomePageCoverComponent,
    SliderListComponent,
    CardComponent,
    NextDirective,
    PrevDirective,
    AlertComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
