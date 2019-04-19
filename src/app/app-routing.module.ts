import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {EurConversionComponent} from './eur-conversion/eur-conversion.component';
import {ViewProjectsComponent} from './view-projects/view-projects.component';
import {ViewResourcesComponent} from './view-resources/view-resources.component';
import { UtilitiesComponent } from './utilities/utilities.component';

const routes: Routes = [
  {
    path: '',
    component: EurConversionComponent
  },
  {
    path: 'view-projects',
    component: ViewProjectsComponent
  },
  {
    path: 'eur-conversion',
    component: EurConversionComponent
  },
  {
    path: 'view-resources',
    component: ViewResourcesComponent
  },
  {
    path: 'utilities',
    component: UtilitiesComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
