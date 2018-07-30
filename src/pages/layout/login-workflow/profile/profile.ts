import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController, AlertController, ToastController, NavParams } from 'ionic-angular';
import { AuthData } from '../../../../providers/auth-data';

import { AngularFireDatabase, FirebaseObjectObservable} from 'angularfire2/database-deprecated';
import { AngularFireAuth } from 'angularfire2/auth';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class AfterLoginPage {
    pic: any;
    phone: string;
    name: string;
    data: any;

    email: any;
    profilePicture: any = "http://www.interreg-central.eu/Content.Node/avatar.jpg"
    profileArray : any=[]; 
    profile: FirebaseObjectObservable<any[]>;
    uid:any;

    constructor(public navCtrl: NavController, public authData: AuthData, public alertCtrl: AlertController,
        public loadingCtrl: LoadingController, private toastCtrl: ToastController, public afAuth: AngularFireAuth,
        public afDb: AngularFireDatabase, public navParams: NavParams) {
        this.data = this.navParams.get('data');
  }
  ionViewWillLoad(){
      this.afAuth.authState.subscribe(userAuth => {
        if(userAuth) {
          this.uid = userAuth.uid;     
          this.email = userAuth.email;
          this.name = userAuth.displayName;
          this.phone = (<any>userAuth).phoneNumber;
          let loadingPopup = this.loadingCtrl.create({
            spinner: 'crescent', 
            content: ''
          });
          loadingPopup.present();

          this.profile = this.afDb.object('/userProfile/'+this.uid );
          this.profile.subscribe((profile) => {
              let p = (<any>profile);
              this.name = p.name;
              this.phone = p.phone;
              this.profilePicture = p.pic;
              this.profileArray = profile;
              loadingPopup.dismiss()
          })

        } else {
          console.log('auth false');
          this.navCtrl.push('LoginPage');
        }

      });
  }

  logout(){
        this.authData.logoutUser()
        .then( authData => {
          console.log("Logged out");
          // toast message
          this.presentToast('bottom','You are now logged out');
        }, error => {
          var errorMessage: string = error.message;
          console.log(errorMessage);
          //this.presentAlert(errorMessage);
        });
  }

  presentAlert(title) {
    let alert = this.alertCtrl.create({
      title: title,
      buttons: ['OK']
    });
    alert.present();
  }

  presentToast(position: string,message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      position: position,
      duration: 3000
    });
    toast.present();
  }

}
