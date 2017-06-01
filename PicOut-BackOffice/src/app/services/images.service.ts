import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import * as firebase from 'firebase';
import { default as swal } from 'sweetalert2';

@Injectable()
export class ImagesService {
  images: FirebaseListObservable<any[]>;

  constructor(public _af: AngularFire) {
    this.images = _af.database.list('/assets');
  }

  uploadImages(image_list): any {
    swal({
      title: 'Succès',
      text: 'Chargement des images en tâche de fond',
      type: 'info'
    });

    for(let i of image_list) {
      console.log(i);
      this.saveImageToStorage(i)
        .then(value => {
          return this.saveImageToDatabase(value);
        })
        .then(_ => {});
    }
  }

  saveImageToStorage(image) {
    var file_name = 'image-' + new Date().getTime() + '.jpg';
    var storage_ref = firebase.storage().ref('images/' + file_name);
    var upload_task = storage_ref.put(image);

    return new Promise((resolve, reject) => {
      upload_task.on('state_changed', snapshot => {
        console.log('snapshot progress : ' + snapshot.valueOf());
      }, error => {
        reject(error);
      }, () => {
        resolve(upload_task.snapshot);
      });
    });
  }

  saveImageToDatabase(image) {
    var database_ref = firebase.database().ref('assets');
    var picture_info ={
      'URL': image.downloadURL,
      'name': image.metadata.name,
      'owner': firebase.auth().currentUser.uid,
      'email': firebase.auth().currentUser.email,
      'lastUpdated': new Date().getTime(),
    };

    return new Promise((resolve, reject) => {
      database_ref.push(picture_info, (result) => {
        resolve(result);
      }).catch(error => {
        reject(error);
      });
    });
  }

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
