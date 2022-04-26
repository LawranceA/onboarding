import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dialog-pg',
  templateUrl: './dialog-pg.component.html',
  styleUrls: ['./dialog-pg.component.css']
})
export class DialogPGComponent implements OnInit {

  dialogPGForm = new FormGroup(
    {
      education : new FormControl('Masters/Post-Graduation'),
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
    console.log(this.dialogPGForm.value)
  }


}
