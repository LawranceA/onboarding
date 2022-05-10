import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../services/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {
  constructor(private tokenStorage:TokenStorageService,private router:Router,private route:ActivatedRoute){}
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