import { Component, OnInit, ViewChild } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';

import { MatSort } from '@angular/material/sort';

import { MatTableDataSource } from '@angular/material/table';

import { Router, ActivatedRoute } from '@angular/router';

const ELEMENT_DATA = [
  {
    name: 'xyz',
    email: 'askhorchaour@gmail.com',
    phoneno: '9845639021',
    doj: '2020-02-02',
    updated: '20220-09-09',
    status: '',
  },

  {
    name: 'abc',
    email: 'askhorChaour@gmail.com',
    phoneno: '9845639021',
    doj: '2020-02-02',
    updated: '20220-09-09',
    status: '',
  },
];

@Component({
  selector: 'app-employees-list',

  templateUrl: './employees-list.component.html',

  styleUrls: ['./employees-list.component.css'],
})
export class EmployeesListComponent implements OnInit {
  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {}

  dataSource = new MatTableDataSource(ELEMENT_DATA);

  displayedColumns: string[] = [
    'name',
    'email',
    'phoneno',
    'doj',
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

  openDiag() {
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
