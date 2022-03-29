import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { EntityContainer } from 'src/app/models/entityContainer.model';
import { SiteAttributes } from 'src/app/models/localisation.model';

@Component({
  selector: 'app-site-info',
  templateUrl: './site-info.component.html',
  styleUrls: ['./site-info.component.css']
})
export class SiteInfoComponent implements OnInit {
  _site!:EntityContainer<SiteAttributes>

  constructor(
    private ref:DynamicDialogRef,
    private config:DynamicDialogConfig
  ) {}

  ngOnInit(): void {
    this._site = this.config.data.site;
    if(!this._site){
      this.ref.close();
    }
  }

}
