import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TrickModule } from './trick/trick.module';
import { UserModule } from './user/user.module';
import { ThreadModule } from "./thread/thread.module";
import { Page404Component } from './page404/page404.component';

@NgModule({
  declarations: [
    AppComponent,
    Page404Component
  ],
  imports: [
    AppRoutingModule,
    TrickModule,
    ThreadModule,
    UserModule,
    BrowserModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
