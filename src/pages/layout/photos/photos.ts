import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController, PopoverController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';
import { DatabaseProvider } from '../../../providers/database/database';
//*********** Import image gallery **************//
import { GalleryModal } from 'ionic-gallery-modal';


@IonicPage()
@Component({
  selector: 'page-photos',
  templateUrl: 'photos.html'
})
export class PhotosPage {
  loaded: boolean ;
  imgPhotos: FirebaseListObservable<any[]>;
  imgPhotosArray : any=[]; 

  photos: any[] = [];
  getIndex:number;

   //*********** View mode  **************/
  photosView: string = "one";

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public modalCtrl: ModalController, public afDB: AngularFireDatabase,
      public db: DatabaseProvider, public popoverCtrl: PopoverController) {
    let loadingPopup = this.loadingCtrl.create({
      spinner: 'crescent', 
      content: ''
    });
    loadingPopup.present();

    let that = this;
    db.getAllCollections('gallery')
        .then(function (e) {
            if (!!e) {
                console.log(e)
                that.imgPhotosArray = e;
            }
            loadingPopup.dismiss();
        });
  }

  fullscreenImage(getIndex) {
    //console.log("NEW ==== getIndex="+getIndex);
    let modal = this.modalCtrl.create(GalleryModal,  {
        // For multiple images //
        photos: this.imgPhotosArray ,
        // For single image //
        // photos: [{url:getImage}], 
      closeIcon: 'close-circle',
      initialSlide: getIndex 
      });
      // console.log("getIndex="+getIndex);
    modal.present();
  }

  presentPopover(myEvent) {
      let popover = this.popoverCtrl.create('PhotosPopoverPage');
      popover.present({
          ev: myEvent
      });

      popover.onDidDismiss(data => {
          switch (data) {
              case 1:
                  this.photosView = 'one'
                  break;
              case 2:
                  this.photosView = 'two'
                  break;
              case 3:
                  this.photosView = 'three'
                  break;
              case 4:
                  this.photosView = 'four'
                  break;
           }
      })
  }
}
