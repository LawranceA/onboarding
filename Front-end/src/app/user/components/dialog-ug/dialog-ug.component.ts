import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dialog-ug',
  templateUrl: './dialog-ug.component.html',
  styleUrls: ['./dialog-ug.component.css']
})
export class DialogUGComponent implements OnInit {

  dialogUGForm = new FormGroup(
    {
      education : new FormControl('Graduation/Diploma'),
      course : new FormControl('',[Validators.required]),
      specialization : new FormControl('',[Validators.required]),
      university: new FormControl('',[Validators.required]),
      percentage: new FormControl('',[Validators.required]),
      startDate: new FormControl('',[Validators.required]),
      endDate: new FormControl('',[Validators.required]),
      marksheet : new FormControl('',[Validators.required]),
      transferCertificate : new FormControl(''),
      provisionalCertificate : new FormControl(''),
      convocationCertificate : new FormControl(''),
    }
  )

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(){
    console.log(this.dialogUGForm.value)
  }


}
