import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import{MaterialModule}from '../material/material.module'
import { DefaultPageComponent } from './components/default-page/default-page.component';
import { RegisterAdminComponent } from './components/register-admin/register-admin.component';
import { RegisterEmployeeComponent } from './components/register-employee/register-employee.component';
import { RegistrationStatusComponent } from './components/registration-status/registration-status.component';
import { EmployeesListComponent } from './components/employees-list/employees-list.component';
import { EmployeeDetailsComponent } from './components/employee-details/employee-details.component';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { PdfViewComponent } from './components/employee-details/pdf-view/pdf-view.component';
import { FilesUploadedComponent } from './components/files-uploaded/files-uploaded.component';
import { ImgViewComponent } from './components/files-uploaded/img-view/img-view.component';
import { EditEmployeeComponent } from './components/edit-employee/edit-employee.component';
import { AdminServiceService } from './admin-service.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [

    AdminDashboardComponent,
     DefaultPageComponent,
     RegisterAdminComponent,
     RegisterEmployeeComponent,
     RegistrationStatusComponent,
     EmployeesListComponent,
     EmployeeDetailsComponent,
     PdfViewComponent,
     FilesUploadedComponent,
     ImgViewComponent,
     EditEmployeeComponent,
 
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    FormsModule,
    NgxExtendedPdfViewerModule,
    HttpClientModule
  ],
  providers: [
    AdminServiceService
  ]
  
})
export class AdminModule { }
