import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

import { AuthService } from '../../providers/auth-service';
import { UserService } from '../../providers/data/user-service';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {
  createSuccess = false;
  registerCredentials = {email: '', password: ''};

  constructor(
    private nav: NavController,
    private auth: AuthService,
    private alertCtrl: AlertController)
  {}

  public register() {
    let createUser = new UserService();

    createUser.auth.createUserWithEmailAndPassword(this.registerCredentials.email, this.registerCredentials.password)
      .then((val) => {
        this.showPopup("Success", "Compte créé avec succès");
      })
      .catch((error) =>{
        this.showPopup("Error", "Une erreur est survenue lors de la création du compte");
      })

    // this.auth.register(this.registerCredentials).subscribe(success => {
    //   if (success) {
    //     this.createSuccess = true;
    //       this.showPopup("Success", "Compte créé avec succès");
    //   } else {
    //     this.showPopup("Error", "Une erreur est survenue lors de la création du compte");
    //   }
    // },
    // error => {
    //   this.showPopup("Error", error);
    // });
  }

  showPopup(title, text) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: [
       {
         text: 'OK',
         handler: data => {
           this.nav.popToRoot();
         }
       }
     ]
    });
    alert.present();
  }
}
