import { Component, OnInit } from '@angular/core';import { ParentService } from 'src/app/services/localisation/parent.service';
import { RegionService } from 'src/app/services/localisation/region.service';
import { SiteService } from 'src/app/services/localisation/site.service';
;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public parentId:number=NaN;
  public regionId:number=NaN;

  constructor(public parentService:ParentService,public regionService:RegionService,public siteService:SiteService) { }

  get parents(){return this.parentService.parents}
  get regions(){return this.regionService.regions}
  get sites(){return this.siteService.sites}
  
  get parentSelected(){
    return !isNaN(this.parentId);
  }

  get regionSelected(){
    return !isNaN(this.regionId);
  }

  ngOnInit(): void {}

  onSelectParent(id:number){
    this.regionService.index(id).subscribe();
    this.siteService.purge();
  }

  onSelectRegion(id:number){
    this.siteService.index(id).subscribe();
  }
}
