
import { Component, OnInit, Output,EventEmitter, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SharedService } from '../../services/shared.service';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-dialog-org',
  templateUrl: './dialog-org.component.html',
  styleUrls: ['./dialog-org.component.css']
})
export class DialogOrgComponent implements OnInit {




organization !: FormGroup;
actionBtn : String = "Save"


  constructor(private fs : FormBuilder,private api : SharedService, private dialogRef : MatDialogRef<DialogOrgComponent>, @Inject(MAT_DIALOG_DATA) public editData : any) { }

  ngOnInit(): void {

    this.organization = this.fs.group({
    organizationName : ['',Validators.required],
  joiningDate : ['',Validators.required],
  relievingDate : ['',Validators.required],
  relievingLetter : ['',Validators.required],
  offerLetter : ['',Validators.required],
  payslip1 : ['',Validators.required],
  payslip2 : ['',Validators.required],
  payslip3 : ['',Validators.required],
  noticePeriodEndDate : ['',Validators.required]
  })
   
//  console.log(this.editData)
if(this.editData){
  this.actionBtn = "Update"
  this.organization.controls['organizationName'].setValue(this.editData.organizationName)
  this.organization.controls['joiningDate'].setValue(this.editData.joiningDate)
  this.organization.controls['relievingDate'].setValue(this.editData. relievingDate)
  this.organization.controls['relievingLetter'].setValue(this.editData.relievingLetter)
  this.organization.controls['offerLetter'].setValue(this.editData.offerLetter)
  this.organization.controls['payslip1'].setValue(this.editData.payslip1)
  this.organization.controls['payslip2'].setValue(this.editData.payslip2)
  this.organization.controls['payslip3'].setValue(this.editData.payslip3)
  this.organization.controls['noticePeriodEndDate'].setValue(this.editData.noticePeriodEndDate)
}
  
 
}
addOrganization(){
  // console.log(this.organization.value)
if(!this.editData){
  if(this.organization.valid){
    this.api.postOrganization(this.organization.value).subscribe({
      next:(res)=>{
        alert("Organization added successfully");
        this.organization.reset();
        this.dialogRef.close("save");
      },
      error:()=>{
        alert("Error while adding the organization")
      }
    })
  }
}else{
  this.updateOrganization()
}
}

updateOrganization(){
  this.api.putOrganization(this.organization.value,this.editData.id).subscribe({
    next:(res)=>{
      alert("Organization Updated successfully");
      this.organization.reset();
      this.dialogRef.close('updated')
    },
    error:(err)=>{
      alert("Error while updating the record??")
    }

  })
}
  

}
