import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, Loading } from 'ionic-angular';

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
  loading: Loading;
  registerCredentials = {email: '', password: ''};

  constructor(
    private nav: NavController,
    private auth: AuthService,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController) {

      let imagePath: String = "/img/" ;

  }

  public createAccount() {
    this.nav.push(RegisterPage);
  }

  public login() {
    this.showLoading()
    let authUser = new UserService();

    authUser.userAuth(this.registerCredentials.email, this.registerCredentials.password);

    // this.auth.login(this.registerCredentials).subscribe(allowed => {
    //   if (allowed) {
    //     setTimeout(() => {
    //     this.loading.dismiss();
    //     this.nav.setRoot(HomePage)
    //     });
    //   } else {
    //     this.showError("Access Denied");
    //   }
    // },
    // error => {
    //   this.showError(error);
    // });
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present();
  }

  showError(text) {
    setTimeout(() => {
      this.loading.dismiss();
    });

    let alert = this.alertCtrl.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
  }


}
