import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ScientifiqueAttributes } from 'src/app/models/scientifique.model';
import { ScientifiqueService } from 'src/app/services/scientifique.service';

@Component({
  selector: 'app-update-scientifique-form',
  templateUrl: './update-scientifique-form.component.html',
  styleUrls: ['./update-scientifique-form.component.css']
})
export class UpdateScientifiqueFormComponent implements OnInit {

  values:ScientifiqueAttributes={
    nom: '',
    prenom: '',
    specialite: '',
    telephone: '',
    email: ''
  }
  constructor(
    private scientifiqueService:ScientifiqueService,
    private ref:DynamicDialogRef,
    private config:DynamicDialogConfig
  ) { }

  ngOnInit(): void {
    this.values = {...this.config.data.scientifique.attributes}
  }

  onSubmit(){
    this.scientifiqueService.update({data:this.values,id:this.config.data.scientifique.id})
    .subscribe({
      next:()=>{this.ref.close();},
      error:(error)=>{}
    });
  }

  onReset(){
    this.ref.close();
  }

}
