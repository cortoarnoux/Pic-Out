import { Injectable } from '@angular/core';
import firebase from 'firebase';

@Injectable()
export class FriendsService {
  public currentUser: string;
  public friendList: firebase.database.Reference;
  public friendIDList: firebase.database.Reference;

  constructor() {
  	// Corto : Récupération de l'UID utilisateur courant
    this.currentUser = firebase.auth().currentUser.uid;
    // Corto : Récupération de la liste des amis en fonction de l'UID
    this.friendList = firebase.database()
        .ref(`users/${this.currentUser}/friends`);

    this.friendIDList = firebase.database()
        .ref(`users/${this.currentUser}/friends`);

  }




  getFriendList(): firebase.database.Reference {
  	return this.friendList;
  }

  removeFriend(id){
    this.friendIDList = firebase.database()
        .ref(`users/${this.currentUser}/friends/${id}`);
    this.friendIDList.remove();
  }
}
