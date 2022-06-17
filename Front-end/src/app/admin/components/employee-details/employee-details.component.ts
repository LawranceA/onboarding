import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdminServiceService } from '../../admin-service.service';
import { FilesUploadedComponent } from '../files-uploaded/files-uploaded.component';
import { faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { AdminService } from '../../services/admin.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { TokenStorageService } from 'src/app/services/token-storage.service';

//dialouge box  data format
export interface DialogData {
  file: any;
}
@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css'],
})
export class EmployeeDetailsComponent implements OnInit {
  faCircleArrowLeft = faCircleArrowLeft;
  faUser = faUser;
  faCircleCheck = faCircleCheck;
  src = '';
  //to set set list color
  personalInfoStatus = 'completed';
  educationStatus = 'completed';
  employmentStatus = 'completed';
  otherdetailsStatus = 'not-completed';
  declaration = 'completed';
  //
  id: any;
  // for modal
  display = '';
  // dummy data to display in personal part
  backData: any;

  //sending this to dialogue box
  // files=[{name:'Profile',src:'../../../../assets/images/account_registered.svg',fileType:'img'},{name:'Marks',src:'../assets/docs/sample.pdf',fileType:'pdf'}]
  files :any;
  constructor(
    public dialog: MatDialog,
    private service: AdminService,
    private route: ActivatedRoute,
    private tokenStorage: TokenStorageService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('id');
      this.service.getOneEmployees(this.id).subscribe((data) => {
        this.backData = data;
        console.log(this.backData);
        if (data[0].photo != null) {
          this.src = `http://onboarding-backend.southindia.cloudapp.azure.com:1337/uploads/${data[0].id}/${data[0].photo}`;
        }
        console.log(this.src);
      });
    });
  }

  openDialog(field: any, index?: any, type?: any): void {
    if (field == 'educational_info') {
      if (type == '10th' || type == '12th') {
        this.files=[{
          name: this.backData[0].educational_info[index].marks_card,
          src: `http://onboarding-backend.southindia.cloudapp.azure.com:1337/uploads/${this.backData[0].id}/${this.backData[0].educational_info[index].marks_card}`,
          fileType:'pdf'
        }];
      } else if (type == 'Graduation' || type == 'Masters/Post-Graduation') {
        this.files=[{
          name: this.backData[0].educational_info[index].marks_card,
          src: `http://onboarding-backend.southindia.cloudapp.azure.com:1337/uploads/${this.backData[0].id}/${this.backData[0].educational_info[index].marks_card}`,
          fileType:'pdf'
        }];
        if(this.backData[0].educational_info[index].provisional_marks_card!=null){
          this.files.push({
            name: this.backData[0].educational_info[index].provisional_marks_card,
            src: `http://onboarding-backend.southindia.cloudapp.azure.com:1337/uploads/${this.backData[0].id}/${this.backData[0].educational_info[index].provisional_marks_card}`,
            fileType:'pdf'
          })
        }
        if(this.backData[0].educational_info[index].convocation_certificate!=null){
          this.files.push({
            name: this.backData[0].educational_info[index].convocation_certificate,
            src: `http://onboarding-backend.southindia.cloudapp.azure.com:1337/uploads/${this.backData[0].id}/${this.backData[0].educational_info[index].convocation_certificate}`,
            fileType:'pdf'
          })
        }
        // check for provisional or convocation present
      }
    } else if (field == 'employment_details') {
      if(type=='Previous'){
        this.files=[{name:this.backData[0].employment_details[index].relieving_letter,src:`http://onboarding-backend.southindia.cloudapp.azure.com:1337/uploads/${this.backData[0].id}/${this.backData[0].educational_info[index].relieving_letter}`,fileType:'pdf'}]
      }else if(type=='Recent'){
        this.files=[{name:this.backData[0].employment_details[index].relieving_letter,src:`http://onboarding-backend.southindia.cloudapp.azure.com:1337/uploads/${this.backData[0].id}/${this.backData[0].educational_info[index].relieving_letter}`,fileType:'pdf'},
        {name:this.backData[0].employment_details[index].offer_letter,src:`http://onboarding-backend.southindia.cloudapp.azure.com:1337/uploads/${this.backData[0].id}/${this.backData[0].educational_info[index].offer_letter}`,fileType:'pdf'},
        {name:this.backData[0].employment_details[index].pay_slip1,src:`http://onboarding-backend.southindia.cloudapp.azure.com:1337/uploads/${this.backData[0].id}/${this.backData[0].educational_info[index].pay_slip1}`,fileType:'pdf'},
        {name:this.backData[0].employment_details[index].pay_slip2,src:`http://onboarding-backend.southindia.cloudapp.azure.com:1337/uploads/${this.backData[0].id}/${this.backData[0].educational_info[index].pay_slip2}`,fileType:'pdf'},
        {name:this.backData[0].employment_details[index].pay_slip3,src:`http://onboarding-backend.southindia.cloudapp.azure.com:1337/uploads/${this.backData[0].id}/${this.backData[0].educational_info[index].pay_slip3}`,fileType:'pdf'}
      ]
      }
    } else if (field == 'other_details') {
      this.files=[{
        name: this.backData[0].other_details.aadhar,
        src: `http://onboarding-backend.southindia.cloudapp.azure.com:1337/uploads/${this.backData[0].id}/${this.backData[0].other_details.aadhar}`,
        fileType:'pdf'
      },
      {
        name: this.backData[0].other_details.pan_card,
        src: `http://onboarding-backend.southindia.cloudapp.azure.com:1337/uploads/${this.backData[0].id}/${this.backData[0].other_details.pan_card}`,
        fileType:'pdf'
      },
    ];
    //check for passport
    if(this.backData[0].other_details.passport!=null){
      this.files.push({
        name: this.backData[0].other_details.passport,
        src: `http://onboarding-backend.southindia.cloudapp.azure.com:1337/uploads/${this.backData[0].id}/${this.backData[0].other_details.passport}`,
        fileType:'pdf'
      })
    }
    }
    const dialogRef = this.dialog.open(FilesUploadedComponent, {
      data: { file: this.files },
    });
  }
}
