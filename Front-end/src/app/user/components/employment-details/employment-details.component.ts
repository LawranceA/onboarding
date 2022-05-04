import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { DialogOrgComponent } from '../dialog-org/dialog-org.component';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogConfig,
} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SharedService } from '../../services/shared.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-employment-details',
  templateUrl: './employment-details.component.html',
  styleUrls: ['./employment-details.component.css'],
})
export class EmploymentDetailsComponent implements OnInit {
  displayedColumns: string[] = [
    'organizationName',
    'joiningDate',
    'relievingDate',
    'noticePeriodEndDate',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;

<<<<<<< HEAD
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private api: SharedService
  ) {}
=======
  formData :any
  constructor(private dialog: MatDialog, private router: Router,private share : SharedService) {}
>>>>>>> fefd1d0b77306d0dbec0a0499dc91ae5230a92e7

  next() {
    this.router.navigateByUrl('/user/details/other-details');
  }
  back() {
    this.router.navigateByUrl('/user/details/educational-qualification');
  }

  ngOnInit(): void {
<<<<<<< HEAD
    this.getAllOrganization();
=======
    let data= this.share.getData()
    if(data.length!=0){
      this.formData=data
    }
>>>>>>> fefd1d0b77306d0dbec0a0499dc91ae5230a92e7
  }

  openDialog() {
    const dialogStyle = {
      height: '90%',
<<<<<<< HEAD
      width: '100%',
      disableClose: true,
    };

    this.dialog
      .open(DialogOrgComponent, dialogStyle)
      .afterClosed()
      .subscribe((val) => {
        if (val === 'save') {
          this.getAllOrganization();
        }
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
=======
      width: '40%',
      disableClose : true,
    };

  const diagRef=this.dialog.open(DialogOrgComponent, dialogStyle);
    diagRef.afterClosed().subscribe(data=>{
    this.closing()
  })
  }

  closing(){
    let data= this.share.getData()
    if(data.length!=0){
      this.formData=data
    }
    
>>>>>>> fefd1d0b77306d0dbec0a0499dc91ae5230a92e7
  }

  getAllOrganization() {
    this.api.getOrganization().subscribe({
      next: (res) => {
        // console.log(res);
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
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

    this.dialog
      .open(DialogOrgComponent, dialogStyle)
      .afterClosed()
      .subscribe((val) => {
        if (val === 'updated') {
          this.getAllOrganization();
        }
      });
  }

  deleteOrganization(id : number){
    this.api.deleteOrganization(id).subscribe({
      next: (res) => {
        // alert(' organization deleted Successfully');
        this.getAllOrganization();
      },
      error: () => {
        // alert('Error in deleting the organization');
      },
    });
  }
}
