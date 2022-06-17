import { Injectable } from '@angular/core';
import { HttpClient,HttpClientModule, HttpHeaders } from '@angular/common/http';
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
    dob:'18-06-1991',
    gender:'female',
    mobile_number:'9876658700',
    alternate_number:'9876545678',
    personal_email:'mahimaha.maheshkumar@gmail.com',
    father_name:'kumar B S',
    photo:"mahi-photo.png",
  },address:[
    {
      type:'permanent',
      house_no:"45",
      street:"vinayaka nagar",
      locality:'RR road',
      city:"bangalore",
      state:"karnataka",
      pincode: "560008",
      country:"India"
    },{
      type:'current',
      house_no:"256",
      street:"maha nagar",
      locality:'KRS',
      city:"Dharwad",
      state:"karnataka",
      pincode: "560009",
      country:"india"
    }
  ],educational:[{
    type:"10th",
    name:"GPST",
    board:'KSSLC',
    course:null,
    start_date:"09-09-2020",
    end_date:"12-09-2020",
    marks:66,
    marksheet:"mahi-10th.pdf",
    transfer_certificate:null,
    provisonal_marks_card:null
  },{
    type:"12th",
    name:"KSPU",
    board:'KPUC',
    course:null,
    start_date:"09-09-2020",
    end_date:"12-09-2020",
    marks:78,
    marksheet:"mahi-12th.pdf",
    transfer_certificate:null,
    provisonal_marks_card:null
  },{
    type:"UG",
    name:"YJHG",
    board:'VTU',
    specilization:'BTECH',
    course:'CS',
    start_date:"09-09-2020",
    end_date:"12-09-2020",
    marks:7,
    marksheet:"mahi-ug.pdf",
    transfer_certificate:null,
    provisonal_marks_card:"mahi-provisonal.pdf"
  }
],employment:[{
  type:'Recent',
  organization:'Wipro',
  joining_date:'09-11-2020',
  reliving_date:'10-12-2021',
  notice_end:'10-12-2021'
},{
  type:'Past',
  organization:'Wipro',
  joining_date:'09-11-2020',
  reliving_date:'10-12-2021',
}],other_details:{
  aadhar_number:"4444 3333 2222",
  aadhar:"mahi aadhar.pdf",
  pan_number:"ABCDE1234F",
  pan:null,
  passport_number:"A2096457",
  passport_expire:"30-12-2022",
  passport:null,
  covid_certificate:null
},declaration:{
  joining_date:"2022-09-02",
  place:"bangalore",
  date:"2022-08-25"
},bank_details:{
  account_holder_name:"Kavitha M S",
  bank_name:"Canara Bank",
  account_number:"0230101088057",
  ifsc_code:"CNRBOOO3424",
  account_type:"savings account",
  pf_acc_no:"MH/BAN/0000064/000/0000123",
  uan_no:"100904319456"
}}]
private header = new HttpHeaders({
  'Access-Control-Allow-Origin': '*',
});

private api ='';
  constructor(private httpClient:HttpClient) { }
  getData(){
    return this.data
  }
  setData(val:any){
    this.data=val
    console.log(this.data)
  }

}