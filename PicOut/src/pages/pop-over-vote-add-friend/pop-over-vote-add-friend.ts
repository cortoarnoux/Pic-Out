import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { FriendsService } from '../../providers/data/friends-service';
import { VotesService } from '../../providers/data/votes-service';
import { CreateVotePage } from '../create-vote/create-vote';
import { Storage } from '@ionic/storage';
import { CurrentUserService } from '../../providers/data/currentuser-service';

/*
  Generated class for the PopOverVoteAddFriend page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-pop-over-vote-add-friend',
  templateUrl: 'pop-over-vote-add-friend.html'
})
export class PopOverVoteAddFriendPage {

  public friendsObjectArray = [];
  public friendAddedToVote = [];
  public friendToUsersData = [];

  constructor(public navCtrl: NavController, 
  	public navParams: NavParams,
  	public friendsData: FriendsService,
  	public alertCtrl: AlertController,
  	public votesData: VotesService,
  	public storage: Storage,
    public currentUserService: CurrentUserService) {}

  ionViewDidLoad() {
  	this.storage.get('friendAddedToVote').then((val) => {
       this.friendAddedToVote = val;

      // Corto : Récupère la liste des UID des amis de l'utilisateur courant
	    this.friendsData.getFriendList().on('value', snapshot => {
	      let rawList = [];
	      snapshot.forEach( snap => {
	      	if(this.friendAddedToVote.indexOf(snap.val().friendUID) == -1){
		        rawList.push({
		          keyID: snap.key,
		          friendUID: snap.val().friendUID
		        });
		    }
	      return false
	      });
	      this.friendsObjectArray = rawList;
	    });

      for(let user in this.friendsObjectArray){
        this.currentUserService.getCurrentUser(this.friendsObjectArray[user].friendUID).on('value', (data) => {
            this.friendToUsersData.push({id: this.friendsObjectArray[user].friendUID, email: data.val().email});
        });
      }

	    console.log(this.friendsObjectArray);
      console.log(this.friendToUsersData);
    })
  }

  public selectFriend(friendUID){
    let infoMessage;
    infoMessage= "Voulez-vous vraiment ajouter "+ friendUID +" à votre liste d'amis ?";
    this.showAddFriendPopup("Vérification", infoMessage, friendUID);
  } 

  showAddFriendPopup(title, text, friendUID) {
      let alert = this.alertCtrl.create({
        title: title,
        subTitle: text,
        buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
        },
        {
          text: 'Ok',
          handler: () => {
          	this.friendAddedToVote.push(friendUID);
          	this.storage.set('friendAddedToVote', this.friendAddedToVote);
            alert.dismiss();
          }
        }
      ]
      });
      alert.present();
    }
}
