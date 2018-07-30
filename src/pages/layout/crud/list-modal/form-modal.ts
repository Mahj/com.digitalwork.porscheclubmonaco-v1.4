import { Component } from '@angular/core';
import { IonicPage, NavController,ViewController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';
import { Observable } from "rxjs/Observable";
import { DatabaseProvider } from '../../../../providers/database/database';

@IonicPage()
@Component({
  selector: 'page-form-modal',
  templateUrl: 'form-modal.html'
})
export class FormModalPage {
  contacts: FirebaseListObservable<any[]>;
 
  constructor(public navCtrl: NavController, public afDB: AngularFireDatabase, public viewCtrl: ViewController,
      public db: DatabaseProvider) {
      //this.contacts = afDB.list('/profile');
      let that = this;
      db.getAllCollections('profile')
          .then(function (e) {
              if (!!e) {
                  console.log(e)
                  that.contacts = <FirebaseListObservable<any[]>>Observable.of(e);
              }
          });

  }

  selectContact(name,id,imgProfile) {
    console.log("selectContact id = "+id);
    let dataArray = {
      name: name,
      id: id,
      imgProfile: imgProfile
    };
    this.viewCtrl.dismiss(dataArray);
  }


}
