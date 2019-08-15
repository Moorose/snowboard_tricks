import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { TrickComponent } from './trick-module/trick/trick.component';
import { TrickListComponent } from './trick-module/trick-list/trick-list.component';

@NgModule({
  declarations: [
    AppComponent,
    TrickComponent,
    TrickListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
