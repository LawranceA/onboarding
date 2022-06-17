import { Component, OnInit } from '@angular/core';
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
import { UserDataService } from 'src/app/user/services/user-data.service';
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
photoForm = new FormGroup({
  photo: new FormControl('no file choosen', [
    Validators.required,
    Validators.pattern('(.*?).(jpg|jpeg|png|gif|JPG|JPEG|PNG|GIF)$'),
  ]),
  photoSrc: new FormControl('', Validators.required),
});
ngOnInit(): void {
  this.data.designation = this.tokenStorage.getDesignation();
  this.data.name = this.tokenStorage.getName();
  //get photo
  this.service.getAdminPhoto(this.tokenStorage.getID()).subscribe(data=>{
    console.log(data.photo)
    this.src=`http://onboarding-backend.southindia.cloudapp.azure.com:1337/uploads/Admin/${data.photo}`
  })
}
fileChange(e: any) {
  console.log(e.target.files);
  let extensionAllowed = { png: true, jpeg: true };
  const file = e.target.files[0];

  if (e.target.files[0].size / 1024 / 1024 > 1) {
    alert('File size should be less than 1MB');
  }

  this.photoForm.patchValue({
    photoSrc: file,
  });
  this.photoForm.patchValue({
    photo: file.name,
  });

  this.photoForm.get('photoSrc')?.updateValueAndValidity();
  this.form.append("photo",this.photoForm.get("photoSrc")?.value)
  this.form.append("id",this.tokenStorage.getID())
  //add photo
  this.service.addAdminPhoto(this.form).subscribe(data=>{
    console.log(data)
  })
  
}

  logout() {
    this.tokenStorage.signOut();
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
