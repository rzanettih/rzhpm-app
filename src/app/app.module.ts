import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AlertModule, ButtonsModule, PopoverModule } from 'ngx-bootstrap';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { EurConversionComponent } from './eur-conversion/eur-conversion.component';
import { ViewProjectsComponent } from './view-projects/view-projects.component';
import { ViewResourcesComponent } from './view-resources/view-resources.component';

import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
 
import { ToastrModule } from 'ngx-toastr';
import { NewResourceComponent } from './view-resources/new-resource/new-resource.component';
import { EditResourceComponent } from './view-resources/edit-resource/edit-resource.component';
import { NewProjectComponent } from './view-projects/new-project/new-project.component';
import { ProjectListItemComponent } from './view-projects/project-list-item/project-list-item.component';
import { UtilitiesComponent } from './utilities/utilities.component';
import { ResourceAllocationAssessmentComponent } from './utilities/resource-allocation-assessment/resource-allocation-assessment.component';



@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    EurConversionComponent,
    ViewProjectsComponent,
    ViewResourcesComponent,
    NewResourceComponent,
    EditResourceComponent,
    NewProjectComponent,
    ProjectListItemComponent,
    UtilitiesComponent,
    ResourceAllocationAssessmentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AlertModule.forRoot(),
    ButtonsModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    FormsModule,
    CommonModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    PopoverModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
