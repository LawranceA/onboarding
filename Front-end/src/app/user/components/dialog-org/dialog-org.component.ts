
import { Component, OnInit, Output,EventEmitter, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

import { SharedService } from '../../services/shared.service';


@Component({
  selector: 'app-dialog-org',
  templateUrl: './dialog-org.component.html',
  styleUrls: ['./dialog-org.component.css']
})
export class DialogOrgComponent implements OnInit {

@Output() oragizationEvent  = new EventEmitter()


organization !: FormGroup;


  constructor(private fs : FormBuilder,private share : SharedService) { }

  ngOnInit(): void {

    this.organization = this.fs.group({
      organizationName : ['',Validators.required],
      hr_name : ['',Validators.required],
    joiningDate : ['',Validators.required],
    relievingDate : ['',Validators.required],
    relievingLetter : ['',Validators.required],
    offerLetter : ['',Validators.required],
    payslip : ['',Validators.required],
    noticePeriodEndDate : ['',Validators.required]
    })
  }

onSubmit(){
  this.share.setFormData(this.organization)
 

}
  

}
