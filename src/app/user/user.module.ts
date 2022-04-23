import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule,Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { UserRoutingModule } from './user-routing.module';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { MaterialModule } from '../material/material.module';
import { EducationalQualificationComponent } from './components/educational-qualification/educational-qualification.component';
import { EmploymentDetailsComponent } from './components/employment-details/employment-details.component';
import { OtherDetailsComponent } from './components/other-details/other-details.component';
import { DeclarationComponent } from './components/declaration/declaration.component';
import { PersonalInformationComponent } from './components/personal-information/personal-information.component';
import { DialogComponent } from './components/dialog10/dialog.component';
import { Dialog12Component } from './components/dialog12/dialog12.component';
import { DialogUGComponent } from './components/dialog-ug/dialog-ug.component';
import { DialogPGComponent } from './components/dialog-pg/dialog-pg.component';
import { DialogOrgComponent } from './components/dialog-org/dialog-org.component';
import { HeaderComponent } from '../layout-components/header/header.component';
import { DetailsComponent } from './components/details/details.component';

import { SharedService } from './services/shared.service';


@NgModule({
  declarations: [
    LandingPageComponent,
    EducationalQualificationComponent,
    EmploymentDetailsComponent,
    OtherDetailsComponent,
    DeclarationComponent,
    PersonalInformationComponent,
    DialogComponent,
    Dialog12Component,
    DialogUGComponent,
    DialogPGComponent,
    DialogOrgComponent,
    HeaderComponent,
    DetailsComponent,

  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    MaterialModule,
    FontAwesomeModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [SharedService]
})
export class UserModule { }
