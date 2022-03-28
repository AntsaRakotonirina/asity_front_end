import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { ScientifiqueAttributes } from 'src/app/models/scientifique.model';
import { ScientifiqueService } from 'src/app/services/scientifique.service';

@Component({
  selector: 'app-create-scientifique-form',
  templateUrl: './create-scientifique-form.component.html',
  styleUrls: ['./create-scientifique-form.component.css']
})
export class CreateScientifiqueFormComponent implements OnInit {
  @Output() close:EventEmitter<void> = new EventEmitter<void>();
  values:ScientifiqueAttributes={
    nom: '',
    prenom: '',
    specialite: '',
    telephone: '',
    email: ''
  }
  constructor(
    private scientifiqueService:ScientifiqueService,
    private ref:DynamicDialogRef
  ) { }

  ngOnInit(): void {
  }

  onSubmit(){
    this.scientifiqueService.store({data:this.values})
    .subscribe({
      next:()=>{this.onReset()},
      error:(error)=>{}
    });
  }

  onReset(){
    this.values = {
      nom: '',
      prenom: '',
      specialite: '',
      telephone: '',
      email: ''
    };
    this.close.emit();
  }
}
