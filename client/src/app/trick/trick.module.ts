import { AddTrickComponent } from './add-trick/add-trick.component';
import { HttpClientModule } from '@angular/common/http';
import { TrickComponent } from './../trick/trick/trick.component';
import { TrickListComponent } from './trick-list/trick-list.component';
import { TrickService } from 'src/app/trick/trick.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditTrickComponent } from './edit-trick/edit-trick.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TrickRoutingModule } from './trick-routing.module';

@NgModule({
  declarations: [
    TrickListComponent,
    TrickComponent,
    AddTrickComponent,
    EditTrickComponent,
    ],
  providers: [ TrickService ],
  imports: [
    CommonModule,
    HttpClientModule,
    TrickRoutingModule,
    ReactiveFormsModule
  ]
})
export class TrickModule { }
