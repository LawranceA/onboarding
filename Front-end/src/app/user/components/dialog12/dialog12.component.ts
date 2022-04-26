import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dialog12',
  templateUrl: './dialog12.component.html',
  styleUrls: ['./dialog12.component.css']
})
export class Dialog12Component implements OnInit {

  dialog12Form = new FormGroup(
    {
      education : new FormControl('12th',[Validators.required]),
      board : new FormControl('',[Validators.required]),
      schoolMedium : new FormControl('',[Validators.required]),
      percentage: new FormControl('',[Validators.required]),
      startDate: new FormControl('',[Validators.required]),
      endDate: new FormControl('',[Validators.required]),
      marksheet : new FormControl('',[Validators.required]),
      transferCertificate : new FormControl('')
    }
  )

  constructor() { }

  ngOnInit(): void {
  }
 

  onSubmit(){
    console.log(this.dialog12Form.value)
  }
}
