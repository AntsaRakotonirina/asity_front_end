import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { EntityContainer, PaginatedData } from 'src/app/models/entityContainer.model';
import { ParticipationAttributes } from 'src/app/models/participations.model';
import { ScientifiqueAttributes } from 'src/app/models/scientifique.model';
import { ParticipationService } from 'src/app/services/participation.service';
import { myEnv } from 'src/environments/myEnv';

@Component({
  selector: 'app-participation',
  templateUrl: './participation.component.html',
  styleUrls: ['./participation.component.css']
})
export class ParticipationComponent implements OnInit {
  _scientifiques!:PaginatedData<EntityContainer<ScientifiqueAttributes>>;
  participations!:EntityContainer<ParticipationAttributes>[];
  searchValue:string="";
  currentPage:number=1;
  isSearching:boolean=false;
  suivi_id:number=NaN;

  constructor(
    private http:HttpClient,
    private participationService:ParticipationService,
    private ref:DynamicDialogRef,
    private config:DynamicDialogConfig,
    private confirmService:ConfirmationService
  ) { }
  
  isInParticipation(scientifique:EntityContainer<ScientifiqueAttributes>):boolean{
    if(this.participations !== undefined && this.participations.length > 0 ){
      const value = this.participations.find((part)=>part.attributes.scientifique_id === scientifique.id);
      return value !== undefined;
    }
    return false;
  }

  get scientifiques(){
    return this._scientifiques.data.filter((scientifique)=>!this.isInParticipation(scientifique));
  }

  ngOnInit(): void {
    this.index();
    this.participations = this.config.data.participations;
    this.suivi_id = this.config.data.suivi_id
  }

  index(){
    this.http.get<PaginatedData<EntityContainer<ScientifiqueAttributes>>>(this.generateUrl())
    .subscribe({
      next:(response)=>{
        this._scientifiques = response;
        this.isSearching = false;
      }
    })
  }

  generateUrl():string{
    const base = myEnv.urls.scientifique+"?page="+this.currentPage;
    if(this.searchValue.length > 0){
      return base+"&query="+this.searchValue
    }
    return base;
  }

  delete(id:number){
    this.participationService.destroy(id).subscribe({
      next:()=>{
        const index = this.participations.findIndex((value)=>value.id === id)
        if(index !== undefined && index >= 0 && this.participations !== undefined){
            this.participations.splice(index,1);
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
      this.participationService.store({data:{scientifique_id:id,suivi_id:this.suivi_id}}).subscribe({
        next:(reponse)=>{
          this.participations.push(reponse.data);
        }
      })
    }
  }
}
