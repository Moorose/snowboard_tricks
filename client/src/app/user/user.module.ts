import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AuthComponent } from './auth/auth.component';
import { HomePageComponent } from './home-page/home-page.component';
import { MyPageComponent } from './my-page/my-page.component';
import { UserPageComponent } from './user-page/user-page.component';

@NgModule({
  declarations: [
    UserPageComponent,
    HomePageComponent,
    AuthComponent,
    MyPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class UserModule {
}
