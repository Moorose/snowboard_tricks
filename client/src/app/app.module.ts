import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { TrickComponent } from './components/trick/trick.component';
import { TrickListComponent } from './components/trick-list/trick-list.component';
import { AddTrickComponent } from './components/add-trick/add-trick.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminPageComponent } from './components/admin-page/admin-page.component';
import { UserPageComponent } from './components/user-page/user-page.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { EditTrickComponent } from './components/edit-trick/edit-trick.component';

@NgModule({
  declarations: [
    AppComponent,
    TrickComponent,
    TrickListComponent,
    AddTrickComponent,
    AdminPageComponent,
    UserPageComponent,
    HomePageComponent,
    EditTrickComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
