import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, CanDeactivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../services/token-storage.service';
import { EducationalQualificationComponent } from '../user/components/educational-qualification/educational-qualification.component';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate,CanDeactivate<EducationalQualificationComponent> {
  constructor(private tokenStorage:TokenStorageService,private router:Router,private route:ActivatedRoute){}
  canDeactivate(component: EducationalQualificationComponent) {
    return false;
  }
  //setting the route gaurd based on user role
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):boolean{
      // getting user type
      const cuser=this.tokenStorage.getUser();
      //if user exists
      if (cuser) {
        //checking tat data on the route is equal to the user type stored in session if so return true else redirect and return false
        if(route.data['role']==cuser){
          return true;
        }
    }
    this.router.navigate(['/login'], { relativeTo: this.route });
    return false;
  }

}