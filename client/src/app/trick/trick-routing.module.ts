import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TrickListComponent } from './trick-list/trick-list.component';
import { EditTrickComponent } from './edit-trick/edit-trick.component';
import { AddTrickComponent } from './add-trick/add-trick.component';

const routes: Routes = [
    { path: '', redirectTo: '/list', pathMatch: 'full' },
    { path: 'list', component: TrickListComponent },
    { path: 'list/addTrick', component: AddTrickComponent },
    { path: 'list/editTrick/:id', component: EditTrickComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TrickRoutingModule {}
