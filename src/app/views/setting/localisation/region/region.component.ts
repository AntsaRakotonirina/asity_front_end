import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-region',
  templateUrl: './region.component.html',
  styleUrls: ['./region.component.css']
})
export class RegionComponent implements OnInit {
  public bread!:MenuItem[];
  
  constructor( private router:Router, private route:ActivatedRoute) { }


  ngOnInit(): void {
    this.bread = [
      {icon:'pi pi-home',command:()=>{this.router.navigateByUrl('/app/settings/localisations/home')}},
      {label:'Regions',icon:'pi pi-home',command:()=>{}},
      {label:'Sites'}
    ]
  }

}
