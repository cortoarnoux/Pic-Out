import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { Facebook } from '@ionic-native/facebook';
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
import { EditAccountPage } from '../pages/edit-account/edit-account';
import { FriendsPage } from '../pages/friends/friends';
import { AddFriendVotePage } from '../pages/add-friend-vote/add-friend-vote';
import { CreateVoteSecondStepPage } from '../pages/create-vote-second-step/create-vote-second-step';
import { CreateVoteThirdStepPage } from '../pages/create-vote-third-step/create-vote-third-step';
import { AngularFireModule } from 'angularfire2';
import { Storage } from '@ionic/storage';
import { PopOverAddFriendPage } from '../pages/pop-over-add-friend/pop-over-add-friend';
import { PopOverVoteAddFriendPage } from '../pages/pop-over-vote-add-friend/pop-over-vote-add-friend';
import { FriendsService } from '../providers/data/friends-service';
import { UserService } from '../providers/data/user-service';
import { CurrentUserService } from '../providers/data/currentuser-service';
import { VotesService } from '../providers/data/votes-service';

export const firebaseConf = {
  apiKey: "AIzaSyDYlV5tQMwkE_gWbT3bET_O9fk_FcvieR4",
  authDomain: "picout-48fe3.firebaseapp.com",
  databaseURL: "https://picout-48fe3.firebaseio.com",
  projectId: "picout-48fe3",
  storageBucket: "picout-48fe3.appspot.com",
  messagingSenderId: "474712704020"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    AccueilPage,
    CreateVotePage,
    AddFriendVotePage,
    MyVotesPage,
    MyAccountPage,
    EditAccountPage,
    FriendsPage,
    CreateVoteSecondStepPage,
    CreateVoteThirdStepPage,
    PopOverAddFriendPage,
    PopOverVoteAddFriendPage,
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConf)
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
    AddFriendVotePage,
    MyAccountPage,
    EditAccountPage,
    FriendsPage,
    CreateVoteSecondStepPage,
    CreateVoteThirdStepPage,
    PopOverAddFriendPage,
    PopOverVoteAddFriendPage,
  ],
  providers: [
    AuthService,
    DataService,
    FriendsService,
    UserService,
    CurrentUserService,
    VotesService,
    Storage
  ]
})
export class AppModule {}
