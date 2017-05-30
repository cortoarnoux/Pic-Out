import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { VotesService } from '../../providers/data/votes-service';
import { CurrentUserService } from '../../providers/data/currentuser-service';
import * as $ from 'jquery';

/*
  Generated class for the VoteGuested page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-vote-guested',
  templateUrl: 'vote-guested.html'
})
export class VoteGuestedPage {

  public voteID = this.navParams.get('vote_id');
  public voteTitle = "";
  public voteExpDate = "";
  public voteMasterID = 0;
  public voteMasterName = "";
  public voteResponsesArray: any;
  public invitedPeopleUserIDs: any;

  constructor(
  	public navCtrl: NavController, 
  	public navParams: NavParams,
  	private votesData: VotesService,
  	private currentUserData: CurrentUserService) {}

  ionViewDidLoad() {

    // Récupération des Datas du vote courant
    this.votesData.getVoteData(this.voteID).on('value', (data) => {
      	console.log(data.val());
      	this.voteTitle = data.val().title;
      	this.voteExpDate = data.val().expiration_date;
      	this.voteMasterID = data.val().voteMasterID;
      	this.invitedPeopleUserIDs = data.val().friendAddedToVote;
      	this.voteResponsesArray = data.val().responsesUrl;
    });

    // Récupération des datas du voteMaster
    this.currentUserData.getCurrentUser(this.voteMasterID).on('value', (data) => {
    	console.log("VoteMaster Datas : ", data.val());
    	this.voteMasterName = data.val().email;
    });
  }

}
