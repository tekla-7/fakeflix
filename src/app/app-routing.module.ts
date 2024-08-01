import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FirstPageComponent } from './features/first-page/component/first-page.component';
import { HomePageCoverComponent } from './features/home-page-cover/home-page-cover.component';

const routes: Routes = [
  {path:'',component:FirstPageComponent},
  {path:'home',component:HomePageCoverComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
