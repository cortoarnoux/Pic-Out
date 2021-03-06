import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';
import { ImageComponent } from './image/image.component';
import { UserComponent } from './user/user.component';

import { UsersService } from './services/users.service';
import { ImagesService } from './services/images.service';
import { ModalUploadComponent } from './image/modal-upload.component';
import { HomeComponent } from './home/home.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'users', component: UserComponent },
  { path: 'images', component: ImageComponent },
];

export const firebaseConfig = {
  apiKey: "AIzaSyDYlV5tQMwkE_gWbT3bET_O9fk_FcvieR4",
  authDomain: "picout-48fe3.firebaseapp.com",
  databaseURL: "https://picout-48fe3.firebaseio.com",
  projectId: "picout-48fe3",
  storageBucket: "picout-48fe3.appspot.com",
  messagingSenderId: "474712704020"
};

const firebaseAuthConfig = {
  provider: AuthProviders.Password,
  method: AuthMethods.Password
};


@NgModule({
  declarations: [
    AppComponent,
    ImageComponent,
    UserComponent,
    ModalUploadComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(firebaseConfig, firebaseAuthConfig)
  ],
  providers: [
    UsersService,
    ImagesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
