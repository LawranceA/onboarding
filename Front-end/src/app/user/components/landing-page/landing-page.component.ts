import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons';
import { faLandmark } from '@fortawesome/free-solid-svg-icons';
import { faPenNib } from '@fortawesome/free-solid-svg-icons';
import { faAddressBook } from '@fortawesome/free-solid-svg-icons';
import { faFileAlt } from '@fortawesome/free-solid-svg-icons';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UserDataService } from '../../services/user-data.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
})
export class LandingPageComponent implements OnInit {
  faBars = faBars;
  faTimes = faTimes;
  faGraduationCap = faGraduationCap;
  faLandmark = faLandmark;
  faPenNib = faPenNib;
  faAddressBook = faAddressBook;
  faFileAlt = faFileAlt;
  faUserCircle = faUserCircle;
  faAngleRight = faAngleRight;

  constructor(private service: UserDataService,private tokenStorage:TokenStorageService) {}
  disable = true;
  // Form Data
  form=new FormData();
  
  ngOnInit(): void {
    this.service.getPhoto(this.tokenStorage.getID()).subscribe(data=>{
      if(data!=null|| data!=undefined){
        this.photoForm.controls['photo'].setValue(data.photo);
      }
    })
  }
  photoForm = new FormGroup({
    photo: new FormControl('no file choosen', [
      Validators.required,
      Validators.pattern('(.*?).(jpg|jpeg|png|gif|JPG|JPEG|PNG|GIF)$'),
    ]),
    photoSrc: new FormControl('', Validators.required),
  });

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
    this.form.append("photo",this.photoForm.get("photoSrc")?.value)
    this.form.append("id",this.tokenStorage.getID())
    
    this.service.addPhoto(this.form).subscribe(data=>{
      console.log(data)
    })
  }
}
