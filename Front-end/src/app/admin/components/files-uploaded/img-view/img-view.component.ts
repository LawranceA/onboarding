import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Route, Router } from '@angular/router';
import { saveAs as importedSaveAs } from 'file-saver';
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
  download() {
    console.log(this.img)
    console.log(this.img.indexOf('/'))
    importedSaveAs(this.img);
  }
}
