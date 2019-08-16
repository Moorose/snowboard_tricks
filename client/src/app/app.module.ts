import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TrickModule } from './trick/trick.module';

@NgModule({
  declarations: [
    AppComponent,
   ],
  imports: [
    AppRoutingModule,
    TrickModule,
    UserModule,
    BrowserModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
