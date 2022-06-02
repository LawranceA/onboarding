import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
  selector: 'app-pdf-view',
  templateUrl: './pdf-view.component.html',
  styleUrls: ['./pdf-view.component.css']
})
export class PdfViewComponent implements OnInit {
  src:any
  display=''
  constructor(private route:ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
  this.route.paramMap.subscribe((params:ParamMap)=>{
  this.src=params.get('src')
  console.log(this.src)
  this.display='block'
})
  }
  openImg() {
    this.display = 'block';
  }
  closeImg() {
    this.display = 'none';
    this.router.navigate(["../../viewEmployee"],{relativeTo:this.route})
  }

}
