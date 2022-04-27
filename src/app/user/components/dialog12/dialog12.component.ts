import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dialog12',
  templateUrl: './dialog12.component.html',
  styleUrls: ['./dialog12.component.css']
})
export class Dialog12Component implements OnInit {
 

  dialog12Form !: FormGroup;

  constructor(private fs : FormBuilder) { }

  ngOnInit(): void {

    this.dialog12Form = this.fs.group({
      education : ['12th',Validators.required],
      board : ['',Validators.required],
      schoolMedium : ['',Validators.required],
      percentage: ['',Validators.required],
      startDate: ['',Validators.required],
      endDate: ['',Validators.required],
      marksheet : ['',Validators.required],
      transferCertificate : ['']
    })
  }
 
add12Form(){
  console.log(this.dialog12Form.value)
}
 
}
