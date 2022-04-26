import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Route, Router } from '@angular/router';

@Component({
  selector: 'app-img-view',
  templateUrl: './img-view.component.html',
  styleUrls: ['./img-view.component.css']
})
export class ImgViewComponent implements OnInit {
img:any
  constructor(private router:Router,private route:ActivatedRoute) { }
display=''
  ngOnInit(): void {
    this.route.paramMap.subscribe((params:ParamMap)=>{
  
      this.img=params.get('src');
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
