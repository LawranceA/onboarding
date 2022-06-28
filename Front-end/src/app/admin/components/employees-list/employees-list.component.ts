import { Component, OnInit, ViewChild } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';

import { MatSort } from '@angular/material/sort';

import { MatTableDataSource } from '@angular/material/table';

import { Router, ActivatedRoute } from '@angular/router';
import { faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faUsersLine } from '@fortawesome/free-solid-svg-icons';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { faUserShield } from '@fortawesome/free-solid-svg-icons';
import { AdminService } from '../../services/admin.service';
@Component({
  selector: 'app-employees-list',

  templateUrl: './employees-list.component.html',

  styleUrls: ['./employees-list.component.css'],
})
export class EmployeesListComponent implements OnInit {
  faCircleArrowLeft=faCircleArrowLeft
  faUsersLine=faUsersLine
  faPen=faPen
  faTrash=faTrash
  faEye=faEye
  faUserShield=faUserShield
  //delete employee name/id
  deleteId='';
  deleteUser=''
  constructor(private router: Router, private route: ActivatedRoute, private service:AdminService) {}
dataSource!: MatTableDataSource<any>;
@ViewChild(MatPaginator)
paginator!: MatPaginator;

@ViewChild(MatSort)
sort!: MatSort;
displayedColumns: string[] = [
  'name',
  'id',
  'email',
  'phone_number',
  'updated_at',
  'status',
  'action',
];
  ngOnInit(): void {
    this.service.getAllEmployees().subscribe(data=>{
      console.log(data)
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    })
  }

  

  

  display = '';

 

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;

    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;

    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // to open dialogue box

  openDiag(name:any,id:any) {
    this.deleteUser=name.toUpperCase()
    this.deleteId=id
    this.display = 'block';
  }

  //to close dialogue box

  close() {
    this.display = 'none';
  }

  //on yes route to desired page

  deleteEmp() {
    this.service.deleteEmployee(this.deleteId).subscribe({
      next: (res) => {
        
        this.router.navigate(['../employeeLists'], { relativeTo: this.route });
      
      },
      error: () => {
        alert('Error in deleting the data');
      },
    });
    
  }

  //on view

  openDetails(id: any) {
    console.log(id);
    this.router.navigate(['../viewEmployee',id], { relativeTo: this.route });
  }

  editPage(id: any) {
    this.router.navigate([`../editEmployee`, id], { relativeTo: this.route });
  }
}
