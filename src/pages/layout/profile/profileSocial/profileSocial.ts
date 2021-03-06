import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController ,ToastController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database-deprecated';
import { DatabaseProvider } from '../../../../providers/database/database';
import { Observable } from "rxjs/Observable";

@IonicPage()
@Component({
  selector: 'page-profile-social',
  templateUrl: 'profileSocial.html'
})
export class ProfileSocialPage {
  following: boolean = false;
  profile:  FirebaseObjectObservable<any[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public afDB: AngularFireDatabase, public loadingCtrl: LoadingController, private toastCtrl: ToastController,
      public db: DatabaseProvider) {

    let loadingPopup = this.loadingCtrl.create({
      spinner: 'crescent',
      content: ''
    });
    loadingPopup.present();
    //this.profile = afDB.object('/profile/1');
    //this.profile.subscribe(() => loadingPopup.dismiss());

    let that = this;
    db.getDocuments('profile', ['position', '==', 'CEO'])
        .then(function (e) {
            let firstOrDefault = e[0];
            if (!!firstOrDefault) {
                console.log(firstOrDefault)
                that.profile = <FirebaseObjectObservable<any>>Observable.of(firstOrDefault);
            }
            loadingPopup.dismiss()
        });

  }

  follow() {
    this.following = !this.following;
    this.presentToast('bottom','Follow user clicked');
  }

  presentToast(position: string,message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      position: position,
      duration: 1000
    });
    toast.present();
  }

}
