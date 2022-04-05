import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { UpdateObservationComponent } from 'src/app/forms/suivi/update-observation/update-observation.component';
import { EntityContainer, SingleEntityContainer } from 'src/app/models/entityContainer.model';
import { ObservationAttributes } from 'src/app/models/observation.model';
import { ObservationRequest } from 'src/app/models/requests/observationRequest.model';
import { SuiviRequest } from 'src/app/models/requests/suiviRequest.model.model';
import { SuiviSingleAttributes } from 'src/app/models/suivi.model';
import { AuthService } from 'src/app/services/auth.service';
import { NoteService } from 'src/app/services/note.service';
import { ObservationService } from 'src/app/services/observation.service';
import { SuiviService } from 'src/app/services/suivi.service';
import { LocalComponent } from './local/local.component';
import { ParticipationComponent } from './participation/participation.component';

@Component({
  selector: 'app-single-suivi',
  templateUrl: './single-suivi.component.html',
  styleUrls: ['./single-suivi.component.css']
})
export class SingleSuiviComponent implements OnInit {
  _suivi!:SingleEntityContainer<SuiviSingleAttributes>;
  _newNoteTitle:string="";
  _newNoteValue:string="";
  id:number = NaN;
  _selectedObsIds:number[]=[];
  _addFormOpen:boolean=false;
  _infoOpen:boolean=false;
  
  constructor(
    public authService:AuthService,
    private suiviService:SuiviService,
    private observationService:ObservationService,
    private route:ActivatedRoute,
    private router:Router,
    private noteService:NoteService,
    private confirmationService:ConfirmationService,
    private dialogService:DialogService
  ) { }

  get attributes(){
    return this._suivi.data.attributes;
  }

  get observations(){
    return this._suivi.data.attributes.observations;
  }
  ngOnInit(): void {
    this.refershSuivi();
  }

  refershSuivi(){
    this.route.paramMap.subscribe({
      next:(params)=>{
        const tmp_id:unknown = params.get('id');
        this.id = tmp_id as number
        this._selectedObsIds.splice(0);
        if(!isNaN(this.id)){
          this.index(this.id);
        }else{
          this.router.navigate(['/app/suivi']);
        }
      }
    })
  }

  index(id:number){
    this.suiviService.show(id).subscribe({
      next:(response)=>{
        this._suivi = response;
      }
    })
  }

  delete(id:number){
    this.observationService.destroy(id).subscribe({
      next:()=>{
        const index = this.observations.findIndex((value)=>value.id === id);
        if(index !== undefined && index >= 0 && this.observations !== undefined){
            this.observations.splice(index,1);
        }
      }
    })
  }

  massDelete(index:number):void{
    if(index < this._selectedObsIds.length){
      this.observationService.destroy(this._selectedObsIds[index])
      .subscribe({
        next:()=>{this.massDelete(index+1);},
        error:()=>{this.massDelete(index+1);}
      })
    }else{
      this.refershSuivi();
    }
  }

  onParticipation(){
    if(this._suivi){
      this.dialogService.open(ParticipationComponent,{
        header:"Participations",
        data:{
          participations:this._suivi.data.attributes.participations,
          suivi_id:this.id
        }
      })
    }
  }
  
  onLocalisation(){
    if(this._suivi){
      this.dialogService.open(LocalComponent,{
        header:"Localisations",
        data:{
          localisations:this._suivi.data.attributes.localisations,
          suivi_id:this.id
        }
      })
    }
  }

  onDelete(id:number){
    this.confirmationService.confirm({
      header:"Supprimer ?",
      message:"Supprimer cette observation ?",
      accept:()=>{this.delete(id)}
    })
  }

  onMassDelete(){
    this.confirmationService.confirm({
      header:"Supprimer ?",
      message:"Supprimer ces observations ?",
      accept:()=>{this.massDelete(0)}
    })
  }

  onAdd(){
    this._addFormOpen = true;
  }

  onUpdate(observation:EntityContainer<ObservationAttributes>){
    this.dialogService.open(UpdateObservationComponent,{
      header: "Observation de "+observation.attributes.animal,
      data:{observation:this.valueToRequest(observation),id:observation.id,name:observation.attributes.animal}
    })
  }

  private valueToRequest(observation:EntityContainer<ObservationAttributes>):ObservationRequest{
    let response:ObservationRequest = {
      habitat: observation.attributes.habitat,
      latitude: observation.attributes.latitude,
      longitude: observation.attributes.longitude,
      nombre: observation.attributes.nombre,
      presence: observation.attributes.presence,
      abondance: observation.attributes.abondance,
      animal_id: observation.attributes.animal_id,
      suivi_id: observation.attributes.suivi_id,
      zone: observation.attributes.zone,
      date: observation.attributes.date
    }
    return response;
  }
}
