import { Component, OnInit } from '@angular/core';
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

  data = { name: '', designation: '' };
  src=''
  constructor(
    private router: Router,
    private tokenStorage: TokenStorageService,
    private route: ActivatedRoute,
    private authService: AuthServiceService,
    private service:UserDataService
  ) {}

  ngOnInit(): void {
    this.data.designation = this.tokenStorage.getDesignation();
    this.data.name = this.tokenStorage.getName();
    this.service.gettingChecked('DB0006').subscribe(data=>{
      this.src="http://localhost:3000/uploads/DB0006/"+data.photo
    })

  }

  logout() {
    this.tokenStorage.signOut();
    this.router.navigate(['./login'], { relativeTo: this.route });
  }
}
