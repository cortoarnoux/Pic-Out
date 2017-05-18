import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import * as firebase from 'firebase';

@Injectable()
export class ImagesService {
  images: FirebaseListObservable<any[]>;

  constructor(public _af: AngularFire) {
    this.images = _af.database.list('/assets');
  }

  uploadImages() { }

  deleteStoragedImage(image_title: string): any {
    let imgToDelete = firebase.storage().ref().child(`images/${image_title}`);
    imgToDelete.delete()
      .then(_ => { return true; })
      .catch(error => {
        console.log(error);
        return false;
      });

  }

  deleteDatabaseImage(image_title: string) {
    this._af.database.list('/assets', { preserveSnapshot: true })
      .subscribe(snapshot => {
        snapshot.forEach(snap => {
          if(snap.val().name == image_title) {
            firebase.database().ref(`assets/${snap.key}`)
              .remove()
                .then()
                .catch(error => {
                  console.log(error);
                });
          }
        });
      });
  }

}
