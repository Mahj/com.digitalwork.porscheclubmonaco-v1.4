import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { RateServiceProvider } from '../../../providers/rate-service/rate-service';
import { AppRate } from '@ionic-native/app-rate';

/**
 * Generated class for the RatePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-rate',
  templateUrl: 'rate.html',
})
export class RatePage {
    appName: string = '';
    headerColor: string = '';

    constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public rateServices: RateServiceProvider, public appRate: AppRate) {

        this.headerColor = this.navParams.get('headerColor');
        this.appName = this.navParams.get('appName');
  }

  rateTheApp() {
      if ((<any>window).cordova) {
          let confirmAlert = this.alertCtrl.create({
              title: "Attention",
              subTitle: 'You are running your code on a desktop browser, to be able to use this feature you need to run it on a device or emulator',
              buttons: ['OK']
          });
          confirmAlert.present();
      } else {
          let confirmAlert = this.alertCtrl.create({
              title: "Great",
              subTitle: 'Would you like to suport us with a 5 start rate?',
              buttons: [
                  {
                      text: 'Cancel',
                      role: 'cancel',
                      handler: data => {
                          console.log('Cancel clicked');
                      }
                  },
                  {
                      text: 'Ok',
                      handler: data => {
                          this.appRate.navigateToAppStore();
                          console.log(data);
                      }
                  }
              ]
          });
          confirmAlert.present();
      }
  }

  provideFeedback() {
          let alert = this.alertCtrl.create({
              title: 'Feedback',
              message: 'Please provide a brief feedback on how can we improve',
              inputs: [
                  {
                      name: 'comments',
                      placeholder: 'Comments'
                  }
              ],
              buttons: [
                  {
                      text: 'Cancel',
                      role: 'cancel',
                      handler: data => {
                          console.log('Cancel clicked');
                      }
                  },
                  {
                      text: 'Save',
                      handler: data => {
                          //Implement save feedback
                          console.log(data);
                      }
                  }
              ]
          });
          alert.present();
      
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RatePage');
  }

}
