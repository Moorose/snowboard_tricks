import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AdminPageComponent } from './admin-page/admin-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { UserPageComponent } from './user-page/user-page.component';

@NgModule({
  declarations: [
    UserPageComponent,
    AdminPageComponent,
    HomePageComponent
  ],
  imports: [
    CommonModule
  ]
})
export class UserModule { }
