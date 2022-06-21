import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons';
import { faLandmark } from '@fortawesome/free-solid-svg-icons';
import { faPenNib } from '@fortawesome/free-solid-svg-icons';
import { faAddressBook } from '@fortawesome/free-solid-svg-icons';
import { faFileAlt } from '@fortawesome/free-solid-svg-icons';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { AdminService } from 'src/app/admin/services/admin.service';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UserDataService } from '../../services/user-data.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  faBars = faBars;
  faTimes = faTimes;
  faGraduationCap = faGraduationCap;
  faLandmark = faLandmark;
  faPenNib = faPenNib;
  faAddressBook = faAddressBook;
  faFileAlt = faFileAlt;
  faUserCircle = faUserCircle;
  faAngleRight = faAngleRight;
  faCheck = faCheck;

  data = { name: '', designation: '' };
  src = '';
  pStatus: any;
  edStatus: any;
  emStatus: any;
  oStatus: any;
  dStatus: any;
employeeData:any
  constructor(
    private router: Router,
    private tokenStorage: TokenStorageService,
    private route: ActivatedRoute,
    private authService: AuthServiceService,
    private service: UserDataService,
    private adminService: AdminService
  ) {}
  //form to send files
  form = new FormData();
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
    this.service.getPhoto(this.tokenStorage.getID()).subscribe((data) => {
      console.log(data);
      this.src = `http://onboarding-backend.southindia.cloudapp.azure.com:1337/uploads/${this.tokenStorage.getID()}/${
        data.photo
      }`;
      console.log(this.src);
    });
    this.service
      .getStatus(this.tokenStorage.getID())
      .subscribe((data) => {
        console.log(data)
        this.employeeData=data
      });
    this.pStatus = localStorage.getItem('pStatus');
    this.edStatus = localStorage.getItem('edStatus');
    this.emStatus = localStorage.getItem('emStatus');
    this.oStatus = localStorage.getItem('oStatus');
    this.dStatus = localStorage.getItem('dStatus');
  }

  logout() {
    this.tokenStorage.signOut();
    this.router.navigate(['./login'], { relativeTo: this.route });
    localStorage.clear();
  }
  fileChange(e: any) {
    console.log(e.target.files);
    let extensionAllowed = { png: true, jpeg: true };
    const file = e.target.files[0];

    if (e.target.files[0].size / 1024 / 1024 > 20) {
      alert('File size should be less than 20MB');
    }

    this.photoForm.patchValue({
      photoSrc: file,
    });
    this.photoForm.patchValue({
      photo: file.name,
    });

    this.photoForm.get('photoSrc')?.updateValueAndValidity();
    this.form.append('photo', this.photoForm.get('photoSrc')?.value);
    this.form.append('id', this.tokenStorage.getID());

    this.service.addPhoto(this.form).subscribe((data) => {
      console.log(data);
      location.reload();
    });
  }
}
