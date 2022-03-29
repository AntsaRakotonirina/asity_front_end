import { Component, OnInit } from '@angular/core';
import { SiteRequest } from 'src/app/models/requests/localisationRequest.model';
import { SiteService } from 'src/app/services/localisation/site.service';
import { AbstractFormComponent } from 'src/app/share/class/abstactForm.component';

@Component({
  selector: 'app-create-site',
  templateUrl: './create-site.component.html',
  styleUrls: ['../../form.component.css','./create-site.component.css']
})
export class CreateSiteComponent extends AbstractFormComponent implements OnInit {
  
  override values:SiteRequest={
    nom: '',
    region_id: 0,
    latitude: 0,
    longitude: 0
  }

  constructor(
    private siteService:SiteService
  ) {
    super(siteService);
  }

  get formValid(): boolean {
    return this.values.nom.length > 0;
  }

  ngOnInit(): void {
  }

  /**
   * On entoure la fonction heriter pour etres sur que l'identiiant de la region est dejas connue
   */
  override onSubmit(): void {
      this.values.region_id = this.siteService.regionId;
      super.onSubmit();
  }

  override  onReset(): void {
      this.values = {
        nom: '',
        region_id: 0,
        latitude: 0,
        longitude: 0
      }
      this.close.emit();
  }

}
