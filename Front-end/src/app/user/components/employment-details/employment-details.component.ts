import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { DialogOrgComponent } from '../dialog-org/dialog-org.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SharedService } from '../../services/shared.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { DialogPrevOrgComponent } from '../dialog-prev-org/dialog-prev-org.component';
import { UserDataService } from '../../services/user-data.service';

export interface DialogData {}
@Component({
  selector: 'app-employment-details',
  templateUrl: './employment-details.component.html',
  styleUrls: ['./employment-details.component.css'],
})
export class EmploymentDetailsComponent implements OnInit {
  histories = ['Recent', 'Previous', 'Fresher'];
  displayedColumns: string[] = [
    'organizationName',
    'joiningDate',
    'relievingDate',
    'hr_name',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;
  data: any = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  fresher = false;
  constructor(
    private dialog: MatDialog,
    private router: Router,
    private api: SharedService,
    private service: UserDataService,
    private tokenStorage: TokenStorageService
  ) {}

  form = new FormData();
  next() {
    this.router.navigateByUrl('/user/details/other-details');
  }
  back() {
    this.router.navigateByUrl('/user/details/educational-qualification');
  }

  ngOnInit(): void {
    this.getAllOrganization();
  }

  openDialog(i: any) {
    const dialogStyle = {
      height: '90%',
      width: '100%',
      disableClose: true,
    };
    switch (i) {
      case 0:
        this.dialog
          .open(DialogOrgComponent, dialogStyle)
          .afterClosed()
          .subscribe((val) => {
            if (val === 'save') {
              this.getAllOrganization();
            }
          });
        break;
      case 1:
        this.dialog
          .open(DialogPrevOrgComponent, dialogStyle)
          .afterClosed()
          .subscribe((val) => {
            if (val === 'save') {
              this.getAllOrganization();
            }
          });
        break;
      case 2:
        this.form.append('type', 'Fresher');
        this.form.append('updated_at', `${new Date()}`);
        this.form.append('updated_by', this.tokenStorage.getName());
        this.form.append('created_at', `${new Date()}`);
        this.form.append('fk_employment_users_id', this.tokenStorage.getID());
        this.api.postOrganization(this.form).subscribe((data) => {
          console.log(data);
          this.service.reloadComponent(window.location.pathname)
        });
        this.next();
        break;
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getAllOrganization() {
    this.api.getOrganization(this.tokenStorage.getID()).subscribe({
      next: (res) => {
        res.forEach((element:any) => {
          console.log(this.data)
          if (element.type != 'Fresher') {
            this.data.push(element);

          }
          // else{
          //   this.fresher=!this.fresher;
          // }
        });
        console.log(res);
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        // alert('Error while fetching the records');
      },
    });
  }

  editOrganization(row: any) {
    const dialogStyle = {
      height: '90%',
      width: '100%',
      data: row,
      disableClose: true,
    };
    if (row.type == 'Recent') {
      this.dialog
        .open(DialogOrgComponent, dialogStyle)
        .afterClosed()
        .subscribe((val) => {
          if (val === 'updated') {
            this.getAllOrganization();
          }
        });
    } else if (row.type == 'Previous') {
      this.dialog
        .open(DialogPrevOrgComponent, dialogStyle)
        .afterClosed()
        .subscribe((val) => {
          if (val === 'updated') {
            this.getAllOrganization();
          }
        });
    }
  }

  deleteOrganization(id: number) {
    if (confirm('Confirm to delete')) {
      this.api.deleteOrganization(id).subscribe((data) => {
        if (data) {
          alert(' organization deleted Successfully');
          this.getAllOrganization();
        } else {
          alert('Error in deleting the organization');
        }
      });
    }
  }
}
