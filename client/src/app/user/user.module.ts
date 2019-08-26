import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AuthComponent } from './auth/auth.component';
import { HomePageComponent } from './home-page/home-page.component';
import { UserPageComponent } from './user-page/user-page.component';

@NgModule({
  declarations: [
    UserPageComponent,

    HomePageComponent,
    AuthComponent
  ],
  imports: [
    CommonModule
  ]
})
export class UserModule {
}
