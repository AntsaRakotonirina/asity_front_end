import { Component, OnInit } from '@angular/core';
import { RegionRequest } from 'src/app/models/requests/localisationRequest.model';
import { RegionService } from 'src/app/services/localisation/region.service';
import { AbstractFormComponent } from 'src/app/share/class/abstactForm.component';

@Component({
  selector: 'app-create-region',
  templateUrl: './create-region.component.html',
  styleUrls: ['../../form.component.css','./create-region.component.css']
})
export class CreateRegionComponent extends AbstractFormComponent implements OnInit {

  override values:RegionRequest={
    nom: '',
    site_parent_id: 0
  }

  constructor(
    private regionService:RegionService
  ) {
    super(regionService);
  }

  get formValid(){
    return this.values.nom.length > 0;
  }
  ngOnInit(): void {}

  /**
   * On entoure la fonction heriter pour etres sur que l'identiiant du parent est dejas connue
   */
  override onSubmit(): void {
    this.values.site_parent_id = this.regionService.parentId;
    super.onSubmit();
  }
  
  override onReset(){
    this.values.nom = '';
    this.close.emit();
  }
}
