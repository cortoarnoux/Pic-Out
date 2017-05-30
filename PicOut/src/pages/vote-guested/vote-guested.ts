import { Component } from '@angular/core';
import { NavController, NavParams, PopoverController } from 'ionic-angular';
import { VotesService } from '../../providers/data/votes-service';
import { CurrentUserService } from '../../providers/data/currentuser-service';
import { PopOverZoomChoicePage } from '../pop-over-zoom-choice/pop-over-zoom-choice';
import { MyVotesPage } from '../my-votes/my-votes';
import { Storage } from '@ionic/storage';
import * as $ from 'jquery';

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
  public choosenUrl: any;

  constructor(
  	public navCtrl: NavController, 
  	public navParams: NavParams,
  	private votesData: VotesService,
  	private currentUserData: CurrentUserService,
    public popoverCtrl: PopoverController,
    public storage: Storage,
    ) {}

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

  public moveToMyVotes() {
    this.navCtrl.push(MyVotesPage);
  }

  presentPopover(url) {
    let popover = this.popoverCtrl.create(PopOverZoomChoicePage, {
        selectedUrl: url,
        voteID: this.voteID
    });
    popover.present();
    popover.onWillDismiss(() => {
      this.storage.get('choosenUrl').then((val) => {
        this.choosenUrl = val;
        console.log("Image choisie : ", this.choosenUrl);
        $('.choice').removeClass('selected');
        $(`img[src="${this.choosenUrl}"]`).closest('.choice').addClass('selected');
      })
   });
  }
}

