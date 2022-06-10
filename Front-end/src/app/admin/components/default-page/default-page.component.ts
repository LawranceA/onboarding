import { Component, OnInit, Sanitizer } from '@angular/core';
import { AdminServiceService } from '../../admin-service.service';
import { DomSanitizer } from '@angular/platform-browser';
import { faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-default-page',
  templateUrl: './default-page.component.html',
  styleUrls: ['./default-page.component.css'],
})
export class DefaultPageComponent implements OnInit {
  faCircleArrowLeft=faCircleArrowLeft
  constructor(private service: AdminServiceService,private sanitization:DomSanitizer) {}

  ngOnInit(): void {
    
  }
}
