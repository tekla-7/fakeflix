import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TVSeriesComponent } from './tv-series.component';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [TVSeriesComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([{
      path: '',
      component: TVSeriesComponent
    }])
  ]
})
export class TvSeroesModule { }
