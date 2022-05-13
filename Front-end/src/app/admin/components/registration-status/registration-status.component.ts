import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Admin } from '../../admin';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-registration-status',
  templateUrl: './registration-status.component.html',
  styleUrls: ['./registration-status.component.css'],
})
export class RegistrationStatusComponent implements OnInit {
  status = '';
  user = '';
  userStatus: any;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: AdminService
  ) {}

  ngOnInit(): void {
    this.userStatus = this.service.getStatus();
  }

  returnBack() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
