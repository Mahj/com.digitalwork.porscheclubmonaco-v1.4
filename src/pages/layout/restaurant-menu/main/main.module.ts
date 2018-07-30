import { NgModule } from '@angular/core';
import { RestaurantCategoryPage } from './main';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
  declarations: [
      RestaurantCategoryPage,
  ],
  imports: [
      IonicPageModule.forChild(RestaurantCategoryPage),
  ],
  exports: [
      RestaurantCategoryPage
  ]
})
export class RestaurantCategoryPageModule {}
