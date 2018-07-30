import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController,ToastController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database-deprecated';
import { DatabaseProvider } from '../../../../providers/database/database';
import { Observable } from "rxjs/Observable";

@IonicPage()
@Component({
  selector: 'page-profile-gallery',
  templateUrl: 'profileGallery.html'
})
export class ProfileGalleryPage {


  profile:  FirebaseObjectObservable<any[]>;
  imgGallery: FirebaseListObservable<any[]>;
  imgGalleryArray:any=[]; 
  friends: FirebaseListObservable<any[]>;
  following: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, private toastCtrl: ToastController, public afDB: AngularFireDatabase,
      public db: DatabaseProvider) {
     
      let loadingPopup = this.loadingCtrl.create({
        spinner: 'crescent', 
        content: ''
      });
      loadingPopup.present();   

      //this.profile = afDB.object('/profile/1');
      //this.friends = afDB.list('/profile/1/friends');
      //this.imgGallery = afDB.list('/profile/1/imgGallery');
      //this.imgGallery.subscribe(imgGallery => {
      //    this.imgGalleryArray = imgGallery;
      //    loadingPopup.dismiss()
      //})
      let that = this;
      db.getDocuments('profile', ['position', '==', 'CEO'])
          .then(function (e) {
              let firstOrDefault = e[0];
              if (!!firstOrDefault) {
                  console.log(firstOrDefault)
                  that.profile = <FirebaseObjectObservable<any>>Observable.of(firstOrDefault);

                  that.friends = <FirebaseListObservable<any>>Observable.of(firstOrDefault.firends);
                  that.imgGallery = <FirebaseListObservable<any>>Observable.of(firstOrDefault.imgGallery);
                  that.imgGalleryArray = firstOrDefault.imgGallery;
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
