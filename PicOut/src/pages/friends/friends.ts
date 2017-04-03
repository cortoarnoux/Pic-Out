import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AccueilPage } from '../accueil/accueil';


/*
  Generated class for the Friends page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-friends',
  templateUrl: 'friends.html'
})
export class FriendsPage {

  constructor(public nav: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad FriendsPage');
  }

  public moveToHome() {
    this.nav.push(AccueilPage, {}, {animate: true, direction: 'back'});
  }

  friends: Array<any> = [
      {name: "Jean-pierre",
       age: 50},
      {name: "Nicolas",
       age: 23},
      {name: "Samantha",
       age: 20},
      {name: "Tim",
       age: 17},
      {name: "Marie",
       age: 19}
  ];


}
