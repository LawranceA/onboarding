import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons';
import { faLandmark } from '@fortawesome/free-solid-svg-icons';
import { faPenNib } from '@fortawesome/free-solid-svg-icons';
import { faHospitalUser } from '@fortawesome/free-solid-svg-icons';
import { faAddressBook } from '@fortawesome/free-solid-svg-icons';
import { faFileAlt } from '@fortawesome/free-solid-svg-icons';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { faClipboardList } from '@fortawesome/free-solid-svg-icons';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { AdminService } from '../../services/admin.service';
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent implements OnInit {
  faBars = faBars;
  faTimes = faTimes;
  faGraduationCap = faGraduationCap;
  faLandmark = faLandmark;
  faPenNib = faPenNib;
  faAddressBook = faAddressBook;
  faFileAlt = faFileAlt;
  faUserCircle = faUserCircle;
  faAngleRight = faAngleRight;
  faUserPlus=faUserPlus;
  faHouse=faHouse;
  faHospitalUser=faHospitalUser;
  faClipboardList=faClipboardList;
  data = { name: '', designation: '' };
  src=''
  

  constructor(
    private router: Router,
    private tokenStorage: TokenStorageService,
    private route: ActivatedRoute,
    private authService: AuthServiceService,
    private service:AdminService
  ) {}
//form to send files
form =new FormData()
ngOnInit(): void {
  this.data.designation = this.tokenStorage.getDesignation();
  this.data.name = this.tokenStorage.getName();
  //get photo
  this.service.getAdminPhoto(this.tokenStorage.getID()).subscribe(data=>{
    console.log(data.pic)
    if(data.pic!=undefined){
      this.src=`http://onboarding-backend.southindia.cloudapp.azure.com:1337/uploads/Admin/${data.pic}`
    }
  })
  
}
fileChange(e: any) {
  let extensionAllowed = { png: true, jpeg: true,jpg:true,pdf:false,doc:false };
  const file = e.target.files[0];
  console.log(e.target.files)
if(e.target.files[0].type=="image/jpg"|| e.target.files[0].type=="image/jpeg"||e.target.files[0].type=="image/png"){
  if (e.target.files[0].size / 1024 / 1024 > 1) {
    alert('File size should be less than 1MB');
    return
  }
}else{
  alert('File should be jpg/jpeg/png format');
  return
}



 
  this.form.append("photo",file)
  this.form.append("id",this.tokenStorage.getID())
  // add photo
  this.service.addAdminPhoto(this.form).subscribe(data=>{
    console.log(data)
    location.reload();
  })
  
}

  logout() {
    this.tokenStorage.signOut();
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
