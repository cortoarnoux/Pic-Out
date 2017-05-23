import { Component } from '@angular/core';
import { Platform, AlertController } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { DataService } from '../providers/data/data-service';
import { LoginPage } from '../pages/login/login';

import { Push, PushObject, PushOptions } from '@ionic-native/push';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = LoginPage;

  constructor(
    platform: Platform, 
    data: DataService,
    public alertCtrl: AlertController,
    public push: Push,
    ) {
    data.init();
    platform.ready().then(() => {
      StatusBar.styleDefault();
      Splashscreen.hide();
      this.pushsetup();
    });
  }

  pushsetup() {
    const options: PushOptions = {
     android: {
         senderID: '474712704020'
     },
     ios: {
         alert: 'true',
         badge: true,
         sound: 'false'
     },
     windows: {}
  };
 
  const pushObject: PushObject = this.push.init(options);
 
  pushObject.on('notification').subscribe((notification: any) => {
    if (notification.additionalData.foreground) {
      let youralert = this.alertCtrl.create({
        title: 'New Push notification',
        message: notification.message
      });
      youralert.present();
    }
  });
 
  pushObject.on('registration').subscribe((registration: any) => {
     //do whatever you want with the registration ID
  });
 
  pushObject.on('error').subscribe(error => alert('Error with Push plugin' + error));
  }
}
