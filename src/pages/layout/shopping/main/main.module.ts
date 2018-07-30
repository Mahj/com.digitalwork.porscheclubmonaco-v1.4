import { NgModule } from '@angular/core';
import { ShoppingCategoryPage } from './main';
import { IonicPageModule } from 'ionic-angular';
//import { ShrinkHeaderModule } from '../../../../components/shrink-header/shrink-header.module';
@NgModule({
  declarations: [
      ShoppingCategoryPage,
  ],
  imports: [
      IonicPageModule.forChild(ShoppingCategoryPage)
    //ShrinkHeaderModule 
  ],
  exports: [
      ShoppingCategoryPage
  ]
})
export class ShoppingCategoryPageModule {}
