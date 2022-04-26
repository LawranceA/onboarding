import { Injectable, NgModule } from '@angular/core';
import { Resolve, RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { DefaultPageComponent } from './components/default-page/default-page.component';
import { EmployeeDetailsComponent } from './components/employee-details/employee-details.component';

import { EmployeesListComponent } from './components/employees-list/employees-list.component';
import { RegisterAdminComponent } from './components/register-admin/register-admin.component';
import { RegisterEmployeeComponent } from './components/register-employee/register-employee.component';
import { RegistrationStatusComponent } from './components/registration-status/registration-status.component';
import { ImgViewComponent } from './components/files-uploaded/img-view/img-view.component';
import { EditEmployeeComponent } from './components/edit-employee/edit-employee.component';
import { PdfViewComponent } from './components/employee-details/pdf-view/pdf-view.component';

const routes: Routes = [
 {path:'', component:AdminDashboardComponent,
 children:[
  {path:'',component:DefaultPageComponent},
  {path:'addAdmin',component:RegisterAdminComponent},
  {path:'addEmployee',component:RegisterEmployeeComponent},
  {path:'registerStatus',component:RegistrationStatusComponent},
  {path:'employeeLists',component:EmployeesListComponent},
  {path:'viewEmployee',component:EmployeeDetailsComponent},
  {path:'viewPdf/:src',component:PdfViewComponent},
  {path:'viewImg/:src',component:ImgViewComponent},
  {path:'editEmployee',component:EditEmployeeComponent}
 ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
@Injectable({providedIn: 'root'})
export class AdminRoutingModule implements Resolve<string> {
  resolve() {
    return Promise.resolve('addAdmin');
  }
 }
  