import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { EntityContainer } from 'src/app/models/entityContainer.model';
import { SiteAttributes } from 'src/app/models/localisation.model';
import { SiteRequest } from 'src/app/models/requests/localisationRequest.model';
import { SiteService } from 'src/app/services/localisation/site.service';

@Component({
  selector: 'app-update-site',
  templateUrl: './update-site.component.html',
  styleUrls: ['../../form.component.css','./update-site.component.css']
})
export class UpdateSiteComponent implements OnInit {
  values!:EntityContainer<SiteAttributes>;
  _request:SiteRequest={
    nom: '',
    region_id: 0,
    latitude: 0,
    longitude: 0
  }

  get formValid(): boolean {
    return this._request.nom.length > 0;
  }

  constructor(
    private siteService:SiteService,
    private ref:DynamicDialogRef,
    private config:DynamicDialogConfig
  ) { }

  ngOnInit(): void {
    this.values = this.config.data.site;
    if(this.values){
      this._request = {...this.values.attributes};
    }else{
      this.onReset();
    }
  }

  onReset(){
    this.ref.close();
  }

  onUpdate(){
    this.siteService.update({data:this._request,id:this.values.id}).subscribe({
      next:()=>{this.onReset()}
    });
  }

}
