import { AppRoutingModule } from './../app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { TrickComponent } from './../trick/trick/trick.component';
import { TrickListComponent } from './trick-list/trick-list.component';
import { TrickService } from 'src/app/trick/trick.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [TrickListComponent, TrickComponent],
  providers: [ TrickService ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ]
})
export class TrickModule { }
