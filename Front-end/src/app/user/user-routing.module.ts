import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeclarationComponent } from './components/declaration/declaration.component';
import { DetailsComponent } from './components/details/details.component';
import { EducationalQualificationComponent } from './components/educational-qualification/educational-qualification.component';
import { EmploymentDetailsComponent } from './components/employment-details/employment-details.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { OtherDetailsComponent } from './components/other-details/other-details.component';
import { PersonalInformationComponent } from './components/personal-information/personal-information.component';

const routes: Routes = [{ path: '', component: LandingPageComponent },
{path:'details',component:DetailsComponent,
children:[
  {path:'personal-information',component:PersonalInformationComponent},
  {path:'educational-qualification',component:EducationalQualificationComponent},
  {path:'employment-details',component:EmploymentDetailsComponent},
  {path:'other-details', component:OtherDetailsComponent},
  {path :'declaration',component:DeclarationComponent},
  { path:'',redirectTo:'personal-information',pathMatch:'full'}

]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
