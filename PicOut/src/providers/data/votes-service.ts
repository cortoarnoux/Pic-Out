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

  getVoteListCreated(): firebase.database.Reference {
    return firebase.database().ref(`users/${this.currentID}/voteMasterList`);
  }

  getVoteListInvited(currentUserID): firebase.database.Reference {
    for(var _i = 0; _i < 100; _i++){
      return this.votePath.orderByChild(`friendAddedToVote/${_i}`).equalTo(currentUserID);
    }
  }

  getVoteData(id): firebase.database.Reference {
    return firebase.database().ref(`votes/${id}`);
  }

  getCurrentUserMasterVotes(): firebase.database.Reference {
    return firebase.database().ref(`votes/${this.currentID}`);
  }

  pushThisVoteAsMaster(voteID) {
    firebase.database().ref(`users/${this.currentID}/voteMasterList/${voteID}`).set({
      verifUser: this.currentID
    });
  }

  addvoteForCurrentFriend(friendUID, voteID){
    firebase.database().ref('users/' + friendUID + '/votesinvitedat').push({
      voteID: voteID
    });
  }
}
