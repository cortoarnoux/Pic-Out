import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { Http} from '@angular/http'

declare var window: any;

@Component({
    templateUrl: 'accueil.html'
})

export class AccueilPage {

  public constructor(
    public navCtrl: NavController,
    private platform: Platform,
    private http: Http
  ) {}

  public blague() {
    this.platform.ready()
      .then(success => {
        alert("C'est un cannibale, il court, il court... Et il se mange !");
      }, (error) => {
        alert(error);
      });
  };
}
