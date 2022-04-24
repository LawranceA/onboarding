import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
  selector: 'app-pdf-view',
  templateUrl: './pdf-view.component.html',
  styleUrls: ['./pdf-view.component.css']
})
export class PdfViewComponent implements OnInit {
  src:any
 
  constructor(private route:ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
  this.route.paramMap.subscribe((params:ParamMap)=>{
  this.src=params.get('src')
  
 
})
  }

}
