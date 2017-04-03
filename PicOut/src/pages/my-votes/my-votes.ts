import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AccueilPage } from '../accueil/accueil';

/*
  Generated class for the MyVotes page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-my-votes',
  templateUrl: 'my-votes.html'
})
export class MyVotesPage {

  constructor(public nav: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyVotesPage');
  }

    public moveToHome() {
      this.nav.push(AccueilPage, {}, {animate: true, direction: 'back'});
    }


    votes: Array<any> = [
        {name: "Vote 1",
         date: "10/03/2017"},
        {name: "Vote 2",
         date: "07/03/2017"},
        {name: "Vote 3",
         date: "15/10/2017"},
        {name: "Vote 4",
         date: "24/03/2017"},
        {name: "Vote 5",
         date: "10/08/2017"}
    ];


}
