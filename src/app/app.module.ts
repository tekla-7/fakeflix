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

@NgModule({
  declarations: [
    AppComponent,
    FirstPageComponent,
    NavBarComponent,
    HomePageCoverComponent,
    SliderListComponent,
    CardComponent,
    NextDirective,
    PrevDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
