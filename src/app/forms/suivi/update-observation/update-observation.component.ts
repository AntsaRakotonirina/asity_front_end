import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ObservationRequest } from 'src/app/models/requests/observationRequest.model';
import { ObservationService } from 'src/app/services/observation.service';

@Component({
  selector: 'app-update-observation',
  templateUrl: './update-observation.component.html',
  styleUrls: ['./update-observation.component.css']
})
export class UpdateObservationComponent implements OnInit {
  values:ObservationRequest={
    habitat: '',
    latitude: 0,
    longitude: 0,
    nombre: 0,
    presence: false,
    abondance: 0,
    animal_id: 0,
    suivi_id: 0,
    zone: '',
    date: new Date()
  }

  id:number = NaN
  name:string = "";

  _isNext:boolean = false;

  constructor(
    private observationService:ObservationService,
    private ref:DynamicDialogRef,
    private config:DynamicDialogConfig
  ) { }

  ngOnInit(): void {
    this.values = {...this.config.data.observation}
    this.id = this.config.data.id;
    this.name = this.config.data.name;
    if(isNaN(this.id) || this.values.animal_id <= 0){
      this.ref.close();
    }
  }

  onSubmit(){
    this.observationService.update({data:this.values,id:this.id}).subscribe({
      next:()=>{this.ref.close()}
    })
  }

  onReset(){
    this.ref.close();
  }

}
