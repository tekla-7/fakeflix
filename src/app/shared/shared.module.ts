import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './components/card/card.component';
import { DescriptionComponent } from './components/description/description.component';
import { AlertComponent } from './components/alert/alert.component';



@NgModule({
  declarations: [
    CardComponent,
    DescriptionComponent,
    AlertComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CardComponent,
    DescriptionComponent,
    AlertComponent
  ]
})
export class SharedModule { }
