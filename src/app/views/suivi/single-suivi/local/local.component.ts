import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { EntityContainer, PaginatedData } from 'src/app/models/entityContainer.model';
import { LocalisationAttributes } from 'src/app/models/local.model';
import { SiteAttributes } from 'src/app/models/localisation.model';
import { LocalService } from 'src/app/services/local.service';
import { myEnv } from 'src/environments/myEnv';

@Component({
  selector: 'app-local',
  templateUrl: './local.component.html',
  styleUrls: ['./local.component.css']
})
export class LocalComponent implements OnInit {
  _sites!:PaginatedData<EntityContainer<SiteAttributes>>;
  localisations!:EntityContainer<LocalisationAttributes>[];
  searchValue:string="";
  currentPage:number=1;
  isSearching:boolean=false;
  suivi_id:number=NaN;

  constructor(
    private http:HttpClient,
    private localService:LocalService,
    private ref:DynamicDialogRef,
    private config:DynamicDialogConfig,
    private confirmService:ConfirmationService
  ) { }
  
  isInLocalisation(site:EntityContainer<SiteAttributes>):boolean{
    if(this.localisations !== undefined && this.localisations.length > 0){
      const value = this.localisations.find((local)=>local.attributes.site_id === site.id);
      return value !== undefined;
    }
    return false;
  }

  get sites(){
    return this._sites.data.filter((site)=>!this.isInLocalisation(site));
  }

  

  ngOnInit(): void {
    this.index();
    this.localisations = this.config.data.localisations
    this.suivi_id = this.config.data.suivi_id
  }

  index(){
    this.http.get<PaginatedData<EntityContainer<SiteAttributes>>>(this.generateUrl())
    .subscribe({
      next:(response)=>{
        this._sites = response;
        this.isSearching = false;
      }
    })
  }

  generateUrl():string{
    const base = myEnv.urls.site+"?page="+this.currentPage;
    if(this.searchValue.length > 0){
      return base+"&query="+this.searchValue
    }
    return base;
  }

  delete(id:number){
    this.localService.destroy(id).subscribe({
      next:()=>{
        const index = this.localisations.findIndex((value)=>value.id === id)
        if(index !== undefined && index >= 0 && this.localisations !== undefined){
            this.localisations.splice(index,1);
        }
      }
    })
  }

  onPage(page:any){
    this.currentPage = page.page+1;
    this.index();
  }

  onSearch(){
    this.currentPage = 1;
    this.isSearching = true;
    this.index();
  }

  onDelete(id:number){
    this.confirmService.confirm({
      message:"Vouler vous vraiment retirer cette localisation ?",
      accept:()=>{this.delete(id)}
    })
  }

  onAdd(id:number){
    if(!isNaN(this.suivi_id)){
      this.localService.store({data:{site_id:id,suivi_id:this.suivi_id}}).subscribe({
        next:(reponse)=>{
          this.localisations.push(reponse.data);
        }
      })
    }
  }
}
