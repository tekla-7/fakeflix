import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageCoverComponent } from './components/home-page-cover/home-page-cover.component';
import { SliderListComponent } from './components/slider-list/component/slider-list.component';
import { PrevDirective } from './components/slider-list/prev.directive';
import { NextDirective } from './components/slider-list/next.directive';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule } from '@angular/router';
import { GetLinkPipe } from './components/slider-list/get-link.pipe';




@NgModule({
  declarations: [
    HomePageCoverComponent,
    PrevDirective,
    NextDirective,
    SliderListComponent,
    GetLinkPipe,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([{
      path: '',
      component:HomePageCoverComponent
    }])
  ],
  
})
export class HomeModule { }
