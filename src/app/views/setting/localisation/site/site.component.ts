import { Component, Input, OnInit } from '@angular/core';
import { SiteService } from 'src/app/services/localisation/site.service';
import { AbstractAPIComponent } from 'src/app/share/class/abstract.component';
import { SiteAttributes } from 'src/app/models/localisation.model';
import { AuthService } from 'src/app/services/auth.service';
import { ConfirmationService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { EntityContainer } from 'src/app/models/entityContainer.model';
import { UpdateSiteComponent } from 'src/app/forms/localisation/site/update-site/update-site.component';
import { SiteInfoComponent } from './site-info/site-info.component';

@Component({
  selector: 'app-site',
  templateUrl: './site.component.html',
  styleUrls: ['../localisation.component.css','./site.component.css']
})
export class SiteComponent extends AbstractAPIComponent<SiteAttributes,SiteAttributes> implements OnInit {
  
  constructor(
    private siteService:SiteService,
    public override authService:AuthService,
    protected override confirmationService:ConfirmationService,
    private dialogService:DialogService,
  ) {
    super(siteService,confirmationService,authService);
  }

  get sites(){return this.siteService.sites}
  
  ngOnInit(): void {}


  onUpdate(site:EntityContainer<SiteAttributes>){
    this.dialogService.open(UpdateSiteComponent,{
      header:"Metre a jour le site",
      data:{site:site}
    })
  }

  override onPage(page:any): void {
    this._curentPage = page.page+1;
    this._parentId = this.siteService.regionId; //On demande l'identifient de la region courente pour appeller la bonne requette
    this.refresh().subscribe();
  }

  onInfo(site:EntityContainer<SiteAttributes>){
    this.dialogService.open(SiteInfoComponent,{
      header:"Information",
      data:{site:site}
    })
  }

  override onDelete(id:number){
    this.confirmationService.confirm({
      header:"Supprimer le site parent ?",
      message:"Supprimer ce parent entraine la suppression des regions et des sites qu'il contient ",
      accept:()=>{this.siteService.destroy(id).subscribe()}
    })
  }
}
