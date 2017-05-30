import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { VotesService } from '../../providers/data/votes-service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-pop-over-zoom-choice',
  templateUrl: 'pop-over-zoom-choice.html'
})
export class PopOverZoomChoicePage {

  public selectedUrl = this.navParams.get('selectedUrl');

  constructor(
   public navCtrl: NavController,
   public navParams: NavParams,
   public viewCtrl: ViewController,
   private votesData: VotesService,
   private storage: Storage) {}

  ionViewDidLoad() {

  }

  public closePopover() {
  	this.viewCtrl.dismiss();
  }

  public selectThisUrl(url) {
    this.storage.set('choosenUrl', this.selectedUrl);
    this.viewCtrl.dismiss();
  }

}
