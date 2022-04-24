import { Component, OnInit,HostListener,ViewChild } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
 

  mode:any='side';
  openSidenav: boolean = true;
  private screenWidth$ = new BehaviorSubject<number>(window.innerWidth);
  @ViewChild('sidenav') matSidenav = MatSidenav;
  constructor() { }

  ngOnInit(): void {
    // for SideNAv responsive
    this.getScreenWidth().subscribe((width) => {
      if (width <750) {
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
  
}
