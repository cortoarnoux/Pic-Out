import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-pop-over-zoom-choice',
  templateUrl: 'pop-over-zoom-choice.html'
})
export class PopOverZoomChoicePage {

  public selectedUrl = this.navParams.get('selectedUrl');

  constructor(
   public navCtrl: NavController,
   public navParams: NavParams,
   public viewCtrl: ViewController) {}

  ionViewDidLoad() {

  }

  public closePopover() {
  	this.viewCtrl.dismiss();
  }

}
