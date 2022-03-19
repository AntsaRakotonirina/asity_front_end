import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { RegionService } from 'src/app/services/localisation/region.service';


@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})
export class ParentComponent implements OnInit {
  public bread!:MenuItem[];
  parentId:number=0;
  constructor(private regionService:RegionService, private router:Router, private route:ActivatedRoute) { }

  get regions(){
    return this.regionService.regions;
  }

  ngOnInit(): void {
    this.route.params.subscribe((params)=>{
      this.parentId = params['id'];
      console.log('index');
      
      this.regionService.index(this.parentId).subscribe();
    })
    this.bread = [{routerLink:['/app/settings/localisations/home'],icon:'pi pi-home'},{label:' Regions',routerLink:['parent']}]
  }

}
