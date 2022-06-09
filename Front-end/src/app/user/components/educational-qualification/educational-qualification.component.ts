import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { DialogComponent } from '../dialog10/dialog.component';
import { Dialog12Component } from '../dialog12/dialog12.component';
import { DialogUGComponent } from '../dialog-ug/dialog-ug.component';
import { DialogPGComponent } from '../dialog-pg/dialog-pg.component';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Dialog10serviceService } from '../../services/dialog10service.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-educational-qualification',
  templateUrl: './educational-qualification.component.html',
  styleUrls: ['./educational-qualification.component.css'],
})
export class EducationalQualificationComponent implements OnInit {
  displayedColumns: string[] = [
    'education',
    'board',
    'percentage',
    'startDate',
    'endDate',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  educations = [
    '10th',
    '12th/Diploma',
    'Graduation',
    'Masters/Post-Graduation',
  ];

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private api: Dialog10serviceService,
    private tokenStorage: TokenStorageService
  ) {}

  next() {
    this.router.navigateByUrl('/user/details/employment-details');
  }

  back() {
    this.router.navigateByUrl('/user/details/personal-information');
  }

  ngOnInit(): void {
    this.get10Form();
  }

  openDialog(index: number) {
    const dialogStyle = {
      height: '90%',
      width: '100%',
      disableClose: true,
    };

    switch (index) {
      case 0:
        this.dialog
          .open(DialogComponent, dialogStyle)
          .afterClosed()
          .subscribe((val) => {
            if (val === 'save') {
              this.get10Form();
            }
          });
        break;
      case 1:
        this.dialog
          .open(Dialog12Component, dialogStyle)
          .afterClosed()
          .subscribe((val) => {
            if (val === 'save') {
              this.get10Form();
            }
          });
        break;
      case 2:
        this.dialog
          .open(DialogUGComponent, dialogStyle)
          .afterClosed()
          .subscribe((val) => {
            if (val === 'save') {
              this.get10Form();
            }
          });
        break;
      case 3:
        this.dialog
          .open(DialogPGComponent, dialogStyle)
          .afterClosed()
          .subscribe((val) => {
            if (val === 'save') {
              this.get10Form();
            }
          });
        break;
    }
  }

  // Get the education Data
  get10Form() {
    this.api.getEducation(this.tokenStorage.getID()).subscribe({
      next: (res) => {
        // console.log(res)
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: () => {
        alert('Error in getting the data');
      },
    });
  }

  // edit form data
  editData(row: any) {
    const dialogStyle = {
      height: '90%',
      width: '100%',
      data: row,
      disableClose: true,
    };

    if (row.type == 'Graduation') {
      this.dialog
        .open(DialogUGComponent, dialogStyle)
        .afterClosed()
        .subscribe((val) => {
          if (val === 'updated') {
            this.get10Form();
          }
        });
    } else if (row.type == 'Masters/Post-Graduation') {
      this.dialog
        .open(DialogPGComponent, dialogStyle)
        .afterClosed()
        .subscribe((val) => {
          if (val === 'updated') {
            this.get10Form();
          }
        });
    } else {
      this.dialog
        .open(DialogComponent, dialogStyle)
        .afterClosed()
        .subscribe((val) => {
          if (val === 'updated') {
            this.get10Form();
          }
        });
    }
  }

  // delete data
  deleteData(id: number) {
    if (confirm('Confirm to delete')) {
      this.api.deleteEducation(id).subscribe({
        next: (res) => {
          alert('Details deleted successfully');
          this.get10Form();
        },
        error: () => {
          alert('Error in deleting the data');
        },
      });
    }
  }

  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();

  //   if (this.dataSource.paginator) {
  //     this.dataSource.paginator.firstPage();
  //   }
  // }
}
