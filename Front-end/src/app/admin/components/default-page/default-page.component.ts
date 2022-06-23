import { Component, OnInit, Sanitizer, ViewChild } from '@angular/core';
import { faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { faMessage } from '@fortawesome/free-solid-svg-icons';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from '../../services/admin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faEye } from '@fortawesome/free-solid-svg-icons';
const ELEMENT_DATA = [
  {
    emp_id: 'DB0001',
    name: 'xyz',
    email: 'askhorchaour@gmail.com',
    updated: '3/02/2021',
    status: 'InProgress',
  },

  {
    emp_id: 'DB0002',
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
  faCircleArrowLeft = faCircleArrowLeft;
  faUsers = faUsers;
  faMessage = faMessage;
  faPen = faPen;
  faTrash = faTrash;
  faEye = faEye;
  //progess value
  value = 75;
  //total of employees
  totals:any
  //pending record
  pendingRecord:any
  //newly added records
  newRecord:any
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatSort)
  sort!: MatSort;
  displayedColumns: string[] = [
    'name',
    'id',
    'email',
    'updated_at',
    'status',
    'action',
  ];
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: AdminService
  ) {}

  ngOnInit(): void {
    this.service.getRecentEmployees().subscribe((val) => {
      this.newRecord=val
      console.log(val)
      this.dataSource = new MatTableDataSource(val);
    });
    this.service.getCardTotals().subscribe(data=>{
      console.log(data)
      this.totals=data
    })
    this.service.getPendingRecords().subscribe(data=>{
      console.log(data)
      this.pendingRecord=data
    })
  }
  routeTo() {
    this.router.navigate(['../employeeLists'], { relativeTo: this.route });
  }
}
