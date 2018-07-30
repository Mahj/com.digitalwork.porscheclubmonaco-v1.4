import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController,ToastController} from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database-deprecated';
import { DatabaseProvider } from '../../../../providers/database/database';
import { Observable } from "rxjs/Observable";

@IonicPage()
@Component({
  selector: 'page-profile-tabs',
  templateUrl: 'profileTabs.html'
})
export class ProfileTabsPage {

    profile:  FirebaseObjectObservable<any[]>;
    imgGallery: FirebaseListObservable<any[]>;
    friends:  FirebaseListObservable<any[]>;
    imgGalleryArray : any=[]; 

    segmentView: string = "one";
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
      //this.imgGallery = afDB.list('/gallery');
      //this.imgGallery.subscribe(imgGallery => {
      //    this.imgGalleryArray = imgGallery;
      //    loadingPopup.dismiss()
      //})

      let that = this;
      db.getDocuments('profile', ['position', '==', 'CEO'])
          .then(function (e) {
              let firstOrDefault = e[0];
              if (!!firstOrDefault) {
                  console.log(firstOrDefault.friends)
                  that.profile = <FirebaseObjectObservable<any>>Observable.of(firstOrDefault);
                  that.friends = firstOrDefault.friends;
              }

              db.getAllCollections('gallery')
                  .then(function (e) {
                      if (!!e) {
                          console.log(e);
                          that.imgGallery = <FirebaseListObservable<any>>Observable.of(e);
                          that.imgGalleryArray = e;
                      }
                  });

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
