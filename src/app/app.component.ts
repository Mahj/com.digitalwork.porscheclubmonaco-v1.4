import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, AlertController } from 'ionic-angular';

//***********  ionic-native **************/
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Network } from '@ionic-native/network';
import { SocialSharing } from '@ionic-native/social-sharing';
//providers
import { OfflinePage } from '../pages/offline/offline';
import { RateServiceProvider } from '../providers/rate-service/rate-service';
import { config } from '../config/config';
import firebase from 'firebase';
import { Push, PushObject, PushOptions } from '@ionic-native/push';

@Component({
  templateUrl: 'app.html'
})


export class MyApp {

  @ViewChild(Nav) nav: Nav;
  rootPage: string = 'IntroPage';
  menu:Array<any> = [];
  pages: Array<any>;
  intro: {}

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public network: Network, public alertCtrl: AlertController, public sharingVar: SocialSharing,
      public rateServices: RateServiceProvider, private push: Push) {
      this.initializeApp();
      firebase.initializeApp(config);
    this.rateServices.promptForRatingNow();
  
    this.pages = [
        { icon: 'ios-book', title: 'Intro', component: "IntroPage" },
        { icon: 'md-home', title: 'Main', component: "MainPage" },
        { icon: 'md-infinite', title: 'Version 1.0.0', component: "" }
    ];

    //un-comment the following line to auto promt the rating popup
    //this.rateServices.autoPromptForRating();

    let that = this;
    //handling when the application goes offline
    this.network.onDisconnect().subscribe((e) => {
      this.platform.ready().then(() => {
          let confirmAlert = that.alertCtrl.create({
              title: "Connection Status",
              subTitle: 'There is not internet connection, this app need internet to work',
              buttons: [ {
                text: 'Ok',
                role: 'ok',
                handler: () => {
                  console.log('Ok clicked');
                  that.nav.setRoot(OfflinePage);
                }
              }]
          });
          confirmAlert.present();
      });
    });

    this.platform.ready().then(() => {
        //this.receivePushNotification();
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
  toggleDetails(menu) {
    if (menu.showDetails) {
        menu.showDetails = false;
        menu.icon = 'ios-add-outline';
    } else {
        menu.showDetails = true;
        menu.icon = 'ios-remove-outline';
    }
  }

  openPage(page) {
    this.nav.setRoot(page.component).catch(err => console.error(err));
  }

  showNoDeviceAlert() {
      let alert = this.alertCtrl.create({
          title: 'Attention',
          subTitle: 'You are running your code on a desktop browser, to be able to use this feature you need to run it on a device or emulator',
          buttons: ['OK']
      });
      alert.present();
  }

  //social sharing
  whatsappShare() {
      this.sharingVar.shareViaWhatsApp("Checkout this blog", null /*Image*/, "http://www.jomendez.com/")
          .then(() => {
              console.log("Whatsapp chare Success");
          },
          () => {
              console.log("Whatsapp chare failed");
              this.showNoDeviceAlert();
          })
  }

  twitterShare() {
      this.sharingVar.shareViaTwitter("Checkout this blog", null /*Image*/, "http://www.jomendez.com/")
          .then(() => {
              console.log("Twitter chare Success");
          },
          () => {
              console.log("Twitter chare failed");
              this.showNoDeviceAlert();
          })
  }

  facebookShare() {
      this.sharingVar.shareViaFacebook("Checkout this blog", null /*Image*/, "http://www.jomendez.com/")
          .then(() => {
              console.log("Facebook chare Success");
          },
          () => {
              console.log("Facebook chare failed");
              this.showNoDeviceAlert();
          })
  }

  otherShare() {
      this.sharingVar.share("Checkout this blog", null/*Subject*/, null/*File*/, "http://www.jomendez.com/")
          .then(() => {
              console.log("General chare Success");
          },
          () => {
              console.log("General chare failed");
              this.showNoDeviceAlert();
          })

  }

  receivePushNotification() {
      const options: PushOptions = {
          android: {
              senderID: config.messagingSenderId
          },
          ios: {
              alert: 'true',
              badge: true,
              sound: 'false'
          },
          windows: {},
          browser: {
              pushServiceURL: 'http://push.api.phonegap.com/v1/push'
          }
      };

      const pushObject: PushObject = this.push.init(options);

      pushObject.on('notification').subscribe((notification: any) => {
          alert('Received a notification ' + JSON.stringify(notification));
      });

      pushObject.on('error').subscribe(error => {
          alert('Error with Push plugin ' + JSON.stringify(error))
      });
  }
}
