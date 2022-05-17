import { Injectable } from '@angular/core';
import { HttpClient,HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Admin } from './admin';


@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {

  data=[{
    id:"DB0045",
    name:"Mahi S",
    email:"mahi25@gmail.com",
    personal_info:{
    first_name:'mahi',
    last_name:'s',
    dob:'1991-06-18',
    gender:'female',
    mobile_number:'987665870',
    alternate_number:null,
    personal_email:'mahi25@gmail.com',
    photo:"mahi-photo.png",
  },address:[
    {
      type:'permanent',
      house_no:"45",
      street:"vinayaka nagar",
      locality:null,
      city:"bangalore",
      state:"karnataka",
      pincode: "5600089",
      country:"India"
    },{
      type:'current',
      house_no:"256",
      street:"maha nagar",
      locality:null,
      city:"Dharwad",
      state:"karnataka",
      pincode: "5600098",
      country:"india"
    }
  ],educational:[{
    type:"10th",
    name:"GPST",
    board:'KSSLC',
    course:null,
    start_date:"2020-09-09",
    end_date:"2020-09-12",
    marks:66,
    marksheet:"mahi-10th.pdf",
    transfer_certificate:null,
    provisonal_marks_card:null
  },{
    type:"12th",
    name:"KSPU",
    board:'KPUC',
    course:null,
    start_date:"2020-09-09",
    end_date:"2020-09-12",
    marks:78,
    marksheet:"mahi-12th.pdf",
    transfer_certificate:null,
    provisonal_marks_card:null
  },{
    type:"UG",
    name:"YJHG",
    board:'VTU',
    course:'CS',
    start_date:"2020-09-09",
    end_date:"2020-09-12",
    marks:7,
    marksheet:"mahi-ug.pdf",
    transfer_certificate:null,
    provisonal_marks_card:"mahi-provisonal.pdf"
  }
],employment:[],other_details:{
  aadhar_number:"2542 8524 2654",
  aadhar:"mahi aadhar.pdf",
  pan_number:"CZSPR5226",
  pan:null,
  passport_number:"2589",
  passport_expire:"2020-09-03",
  passport:null,
  covid_certificate:null
},declaration:{
  joining_date:"2022-09-02",
  place:"bangalore",
  date:"2022-08-25"
}}]
  

  
  constructor(private httpClient:HttpClient) { }
  getData(){
    return this.data
  }
  setData(val:any){
    this.data=val
    console.log(this.data)
  }
}