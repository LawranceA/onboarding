import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

export interface EditEmployee
{
    id:string
    name: string;
    email: string;
    phoneno: string;
    doj:string;
    designation:string;
   
    
} 
const data: EditEmployee[] = [
  { id:'DB001',name: 'xyz', email: 'xyz@gmail.com',phoneno: '9845639021',doj:'2020-02-02',designation:'Front End' }
 ];
@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {

  constructor(private router:Router,private route:ActivatedRoute) { }

  ngOnInit(): void {
  }
  edit(e:Event){
    e.preventDefault()
    console.log("s")
    // this.router.navigate(["../registerStatus"],{relativeTo:this.route})
  }
}
