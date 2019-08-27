import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Page404Component } from './page404/page404.component';
import { ThreadModule } from './thread/thread.module';
import { TrickModule } from './trick/trick.module';
import { UserModule } from './user/user.module';

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
