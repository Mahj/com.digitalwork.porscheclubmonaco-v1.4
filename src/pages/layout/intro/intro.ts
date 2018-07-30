import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-intro',
  templateUrl: 'intro.html'
})




export class IntroPage {

  slides = [
    {
      title: "WELCOME",
      description: "This is ionic-boilerplate with firebase",
      image: "./assets/slide1.png",
      color: "#182f19"
    },
    {
        title: "Components and Features",
      description: "This template provides a large amount of components ready to be used with beautiful designs",
      image: "./assets/slide2.png",
      color: "#071f18"
    },
    {
      title: "Colors",
      description: "Ready, easy to use predefined colors, just use color=\"<color name>\" on any html elemnt to apply the color",
      image: "./assets/slide4.png",
      color: "#0a0a02"
    }
  ];


  constructor(public navCtrl: NavController) {
  }

  openPage() {
      this.navCtrl.setRoot('MainPage'); 

  }
}
