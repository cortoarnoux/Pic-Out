import { Component } from '@angular/core';
import { NavController, AlertController, Loading } from 'ionic-angular';

import { AuthService } from '../../providers/auth-service';
import { UserService } from '../../providers/data/user-service';

import { RegisterPage } from '../register/register';
import { HomePage } from '../home/home';
import { AccueilPage } from '../accueil/accueil';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [UserService]
})
export class LoginPage {
  private registerCredentials = {email: '', password: ''};
  private homePage = HomePage;

  constructor(
    private navCtrl: NavController,
    private auth: AuthService,
    private alertCtrl: AlertController) {

    let imagePath: String = "/img/" ;
  }

  public login() {
    let authUser = new UserService();

    authUser.auth.signInWithEmailAndPassword(this.registerCredentials.email, this.registerCredentials.password)
      .catch((error) => {
        let errorCode = error.code;
        let errorMessage = error.message;

        console.log(errorCode + " " + errorMessage);
      })
      .then((value) => {
        console.log(value);
        this.navCtrl.push(AccueilPage);
      })
  }

  public registerPage() {
    this.navCtrl.push(RegisterPage);
  }

  /*alert(errorMessage: String) {
    let alert = this.alertCtrl.create({
      title: 'Connection fail...',
      subTitle: errorMessage,
      buttons: ['OK']
    });
    alert.present(prompt);
  }*/


}
