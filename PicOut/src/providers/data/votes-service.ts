import { Injectable } from '@angular/core';
import firebase from 'firebase';

@Injectable()
export class VotesService {

  public votePath: any;
  public votes: any;
  public voteMasterID: any;
  public currentID = firebase.auth().currentUser.uid;


  constructor() {
    this.votePath = firebase.database().ref('/votes');
  }

  getUserList(): firebase.database.Reference {
    return this.votes;
  }



  addFriendForCurrentVote(currentVoteID, friendUID){
    /*firebase.database().ref('users/' + this.currentVoteID + '/friends').push({
      friendUID: friendUID
    });*/
  }
}