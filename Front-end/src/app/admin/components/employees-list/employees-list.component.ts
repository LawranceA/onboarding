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
const ELEMENT_DATA = [
  {
    emp_id:'DB0001',
    name: 'xyz',
    email: 'askhorchaour@gmail.com',
    phoneno: '984563902',
    updated: '3/02/2021',
    status: '',
  },

  {
    emp_id:'DB0002',
    name: 'abc',
    email: 'askhorChaour@gmail.com',
    phoneno: '9845639021',
    updated: '17/02/2022',
    status: '',
  },
  {
    emp_id:'DB0002',
    name: 'abc',
    email: 'askhorChaour@gmail.com',
    phoneno: '9845639021',
    updated: '17/02/2022',
    status: '',
  },
  {
    emp_id:'DB0002',
    name: 'abc',
    email: 'askhorChaour@gmail.com',
    phoneno: '9845639021',
    updated: '17/02/2022',
    status: '',
  },
  {
    emp_id:'DB0002',
    name: 'abc',
    email: 'askhorChaour@gmail.com',
    phoneno: '9845639021',
    updated: '17/02/2022',
    status: '',
  },
  {
    emp_id:'DB0002',
    name: 'abc',
    email: 'askhorChaour@gmail.com',
    phoneno: '9845639021',
    updated: '17/02/2022',
    status: '',
  },
  {
    emp_id:'DB0002',
    name: 'abc',
    email: 'askhorChaour@gmail.com',
    phoneno: '9845639021',
    updated: '17/02/2022',
    status: '',
  },
];

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
  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {}

  dataSource = new MatTableDataSource(ELEMENT_DATA);

  displayedColumns: string[] = [
    'name',
    'emp_id',
    'email',
    'phoneno',
    'updated',
    'status',
    'action',
  ];

  display = '';

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

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

  openDiag(name:any) {

    this.deleteId=name.toUpperCase()
    this.display = 'block';
  }

  //to close dialogue box

  close() {
    this.display = 'none';
  }

  //on yes route to desired page

  deleteEmp() {
    this.router.navigate(['../registerStatus'], { relativeTo: this.route });
  }

  //on view

  openDetails(id: any) {
    console.log(id);
    this.router.navigate(['../viewEmployee'], { relativeTo: this.route });
  }

  editPage(id: any) {
    this.router.navigate([`../editEmployee`, id], { relativeTo: this.route });
  }
}
