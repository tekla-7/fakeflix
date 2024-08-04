import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FirstPageComponent } from './features/first-page/component/first-page.component';
import { HomePageCoverComponent } from './features/home-page-cover/home-page-cover.component';
import { authGuard } from './features/first-page/service/auth.guard';
import { signGuard } from './features/first-page/service/sign.guard ';
import { TVSeriesComponent } from './features/tv-series/tv-series.component';

const routes: Routes = [
  { path: '', component: FirstPageComponent, canActivate: [signGuard] },
  { path: 'home', component: HomePageCoverComponent, canActivate: [authGuard] },
  {
    path: 'type/:name',
    component: TVSeriesComponent,
    canActivate: [authGuard],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
