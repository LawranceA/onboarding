import { Component, OnInit, Sanitizer } from '@angular/core';
import { faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import {faMessage}  from '@fortawesome/free-solid-svg-icons';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faEye } from '@fortawesome/free-solid-svg-icons';
const ELEMENT_DATA = [
  {
    emp_id:'DB0001',
    name: 'xyz',
    email: 'askhorchaour@gmail.com',
    updated: '3/02/2021',
    status: 'InProgress',
  },

  {
    emp_id:'DB0002',
    name: 'abc',
    email: 'askhorChaour@gmail.com',
    updated: '17/02/2022',
    status: 'InProgress',
  },
];
@Component({
  selector: 'app-default-page',
  templateUrl: './default-page.component.html',
  styleUrls: ['./default-page.component.css'],
})
export class DefaultPageComponent implements OnInit {
  faCircleArrowLeft=faCircleArrowLeft
  faUsers=faUsers
  faMessage=faMessage
  faPen=faPen
  faTrash=faTrash
  faEye=faEye
  //progess value
  value=75;
  displayedColumns: string[] = [
    'name',
    'emp_id',
    'email',
    'updated',
    'status',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;
  constructor(private router:Router,private route:ActivatedRoute) {}

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(ELEMENT_DATA);
  }
  routeTo(){
    this.router.navigate(['../employeeLists'], { relativeTo: this.route });
  }
}
