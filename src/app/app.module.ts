import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './features/auth/component/auth.component';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire/compat';
import { FooterComponent } from './core/component/footer/footer.component';
import { SharedModule } from './shared/shared.module';
import { NavBarComponent } from './core/component/nav-bar/component/nav-bar.component';

const firebaseConfig = {
  apiKey: 'AIzaSyB1IyCnh_OjmioL_tYwenDjTE8o53_vgtI',
  authDomain: 'fakedlix-79236.firebaseapp.com',
  projectId: 'fakedlix-79236',
  storageBucket: 'fakedlix-79236.appspot.com',
  messagingSenderId: '1063688445035',
  appId: '1:1063688445035:web:a95bc2113744b10678a52e',
};
@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    NavBarComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
    AngularFireModule.initializeApp(firebaseConfig),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
