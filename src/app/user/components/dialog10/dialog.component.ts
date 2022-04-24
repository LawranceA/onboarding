import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {


  dialog10Form = new FormGroup(
    {
      education : new FormControl('10th',[Validators.required]),
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
    console.log(this.dialog10Form.value)
  }

}
