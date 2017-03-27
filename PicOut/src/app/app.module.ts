import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { AccueilPage } from '../pages/accueil/accueil';
import { AuthService } from '../providers/auth-service';
import { DataService } from '../providers/data/data-service';
import { RegisterPage } from '../pages/register/register';
import { CreateVotePage } from '../pages/create-vote/create-vote';
import { MyVotesPage } from '../pages/my-votes/my-votes';
import { MyAccountPage } from '../pages/my-account/my-account';
import { FriendsPage } from '../pages/friends/friends';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    AccueilPage,
    CreateVotePage,
    MyVotesPage,
    MyAccountPage,
    FriendsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    AccueilPage,
    RegisterPage,
    CreateVotePage,
    MyVotesPage,
    MyAccountPage,
    FriendsPage
  ],
  providers: [
    AuthService,
    DataService
  ]
})
export class AppModule {}
