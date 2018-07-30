import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController , LoadingController} from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';
import { DatabaseProvider } from '../../../../providers/database/database';
import { Observable } from "rxjs/Observable";

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})

export class MapPage {
  mapList: FirebaseListObservable<any[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public loadingCtrl: LoadingController, public afDB: AngularFireDatabase,
      public db: DatabaseProvider) {
      let loading = this.loadingCtrl.create({
        spinner: 'crescent',
        content: ''
      });
      loading.present();
      let that = this;
      db.getAllCollections('map')
          .then(function (e) {
              if (!!e) {
                  console.log(e)
                  that.mapList = <FirebaseListObservable<any[]>>Observable.of(e);
              }
              loading.dismiss();
          });
         
  }


  showDetail(mapId) {
    let profileModal = this.modalCtrl.create('MapDetailPage', { 
        mapId: mapId
    });
    profileModal.present();
  }
  showMapMarker() {
    let profileModal2 = this.modalCtrl.create('MapMarkerPage');
    profileModal2.present();
  }

}
