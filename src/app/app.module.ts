import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SubscribeComponent } from './subscribe/subscribe.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { AmplifyAuthenticatorModule } from '@aws-amplify/ui-angular';
import { Amplify } from 'aws-amplify';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SubscribeComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AmplifyAuthenticatorModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
