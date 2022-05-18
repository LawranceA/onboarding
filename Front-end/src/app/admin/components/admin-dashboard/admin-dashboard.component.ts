import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MatSidenav } from '@angular/material/sidenav';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent implements OnInit {
  mode: any = 'side';
  data = { name: '', designation: '' };
  openSidenav: boolean = true;
  private screenWidth$ = new BehaviorSubject<number>(window.innerWidth);
  @ViewChild('sidenav') matSidenav = MatSidenav;
  constructor(
    private tokenStorage: TokenStorageService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthServiceService
    
  ) {}

  ngOnInit(): void {
    this.data.designation = this.tokenStorage.getDesignation();
    this.data.name = this.tokenStorage.getName();
    console.log(this.data);
    // for SideNAv responsive
    this.getScreenWidth().subscribe((width) => {
      if (width < 750) {
        this.mode = 'over';
        this.openSidenav = false;
      } else if (width > 640) {
        this.mode = 'side';
        this.openSidenav = true;
      }
    });
  }
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth$.next(event.target.innerWidth);
  }
  getScreenWidth(): Observable<number> {
    return this.screenWidth$.asObservable();
  }

  logout() {
    this.tokenStorage.signOut();
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
