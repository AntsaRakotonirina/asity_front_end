import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { EntityContainer } from 'src/app/models/entityContainer.model';
import { RegionAttributes } from 'src/app/models/localisation.model';
import { RegionRequest } from 'src/app/models/requests/localisationRequest.model';
import { RegionService } from 'src/app/services/localisation/region.service';

@Component({
  selector: 'app-update-region',
  templateUrl: './update-region.component.html',
  styleUrls: ['../../form.component.css','./update-region.component.css']
})
export class UpdateRegionComponent implements OnInit {
  values!:EntityContainer<RegionAttributes>;
  _request:RegionRequest={
    nom: '',
    site_parent_id: 0
  }
  constructor(
    private regionService:RegionService,
    private ref:DynamicDialogRef,
    private config:DynamicDialogConfig
  ) { }
  get formValid(){
    return this._request.nom.length > 0;
  }
  ngOnInit(): void {
    this.values = this.config.data.region;
    if(this.values){
      //On peut faire cette affectation car RegionRequest et RegionAttributes on les memes attributs
      this._request = {...this.values.attributes};  
    }else{
      this.onReset();
    }
  }

  onReset(){
    this.ref.close();
  }

  onUpdate(){
    this.regionService.update({data:this._request,id:this.values.id}).subscribe({
      next:()=>{this.onReset()}
    });
  }
}
