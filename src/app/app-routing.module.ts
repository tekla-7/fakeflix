import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './features/auth/component/auth.component';
import { authGuard } from './features/auth/service/auth.guard';
import { signGuard } from './features/auth/service/sign.guard ';
import { TVSeriesComponent } from './features/tv-series/tv-series.component';
import { PageNotFoundComponent } from './core/component/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', component: AuthComponent, canActivate: [signGuard] },
  {
    path: 'home',

    loadChildren: () =>
      import('./features/home/home.module').then((m) => m.HomeModule),

    canActivate: [authGuard],
  },
  {
    path: 'type/:name',

    loadChildren: () =>
      import('./features/tv-series/tv-series.module').then(
        (m) => m.TvSeroesModule
      ),
    canActivate: [authGuard],
  },
  {
    path: '**',
    pathMatch: 'full',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
