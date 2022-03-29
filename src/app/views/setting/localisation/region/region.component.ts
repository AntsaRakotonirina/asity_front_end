import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { UpdateRegionComponent } from 'src/app/forms/localisation/region/update-region/update-region.component';
import { EntityContainer } from 'src/app/models/entityContainer.model';
import { RegionAttributes } from 'src/app/models/localisation.model';
import { AuthService } from 'src/app/services/auth.service';
import { RegionService } from 'src/app/services/localisation/region.service';
import { AbstractAPIComponent } from 'src/app/share/class/abstract.component';

@Component({
  selector: 'app-region',
  templateUrl: './region.component.html',
  styleUrls: ['../localisation.component.css','./region.component.css']
})
export class RegionComponent extends AbstractAPIComponent<RegionAttributes,RegionAttributes> implements OnInit {
  regionId:number = NaN;
  @Output() select:EventEmitter<number> = new EventEmitter<number>();
  @Output() delete:EventEmitter<number> = new EventEmitter<number>();

  constructor(
    private regionService:RegionService,
    public override authService:AuthService,
    protected override confirmationService:ConfirmationService,
    private dialogService:DialogService
  ) {
    super(regionService,confirmationService,authService);
   }

  get regions(){
    return this.regionService.regions;
  }

  ngOnInit(): void {
  }
  
  onSelect(id:number){
    this.regionId = id
    this.select.emit(this.regionId);
  }

  override onPage(page:any): void {
    this._curentPage = page.page+1;
    this._parentId = this.regionService.parentId; //On demande l'identifient du parent courent pour appeller la bonne requette
    this.refresh().subscribe();
  }

  override onDelete(id:number){
    this.confirmationService.confirm({
      header:"Supprimer la region ?",
      message:"Supprimer cette region entraine la suppression des sites qu'il contient ",
      accept:()=>{this.delete.emit(id)}
    })
  }

  onUpdate(region:EntityContainer<RegionAttributes>){
    this.dialogService.open(UpdateRegionComponent,{
      header:"Modifier la region de "+region.attributes.nom,
      data:{region:region}
    })
  }
}
