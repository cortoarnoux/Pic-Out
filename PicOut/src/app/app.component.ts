import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { DataService } from '../providers/data/data-service';
import { LoginPage } from '../pages/login/login';
import { AccueilPage } from '../pages/accueil/accueil';
import { CreateVotePage } from '../pages/create-vote/create-vote';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = CreateVotePage;

  constructor(platform: Platform, data: DataService) {
    data.init();
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }
}
