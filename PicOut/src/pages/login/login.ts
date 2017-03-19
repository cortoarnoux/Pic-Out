import { Component } from '@angular/core';
import { NavController, AlertController, Loading } from 'ionic-angular';

import { AuthService } from '../../providers/auth-service';
import { UserService } from '../../providers/data/user-service';

import { RegisterPage } from '../register/register';
import { HomePage } from '../home/home';

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
      .catch(function(error) {
        let errorCode = error.code;
        let errorMessage = error.message;

        console.log(errorCode + " " + errorMessage);

        let alert = this.alertCtrl.create({
          title: 'Fail',
          subTitle: errorMessage,
          buttons: ['OK']
        });
        alert.present(prompt);
      })
      .then((value) => {
        console.log(value);
        this.navCtrl.push(HomePage);
      })
  }

  public registerPage() {
    this.navCtrl.push(RegisterPage);
  }


}
