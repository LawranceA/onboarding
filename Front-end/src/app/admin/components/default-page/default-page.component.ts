import { Component, OnInit, Sanitizer } from '@angular/core';
import { AdminServiceService } from '../../admin-service.service';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-default-page',
  templateUrl: './default-page.component.html',
  styleUrls: ['./default-page.component.css'],
})
export class DefaultPageComponent implements OnInit {
  constructor(private service: AdminServiceService,private sanitization:DomSanitizer) {}
src:any
  ngOnInit(): void {
    this.service.getDetails('DB0001').subscribe(data=>{
      console.log(data.photo)
      // this.src=this.sanitization.bypassSecurityTrustResourceUrl(`${data.photo}`)
    this.src="http://localhost:3000/uploads/DB0001/"+data.photo
    });
    
  }
}
