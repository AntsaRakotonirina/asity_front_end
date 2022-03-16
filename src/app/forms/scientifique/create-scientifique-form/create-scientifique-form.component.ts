import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { ScientifiqueAttributes } from 'src/app/models/scientifique.model';
import { ScientifiqueService } from 'src/app/services/scientifique.service';

@Component({
  selector: 'app-create-scientifique-form',
  templateUrl: './create-scientifique-form.component.html',
  styleUrls: ['./create-scientifique-form.component.css']
})
export class CreateScientifiqueFormComponent implements OnInit {
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
    this.scientifiqueService.store(this.values)
    .subscribe({
      next:()=>{this.ref.close()},
      error:(error)=>{}
    });
  }

  onReset(){
    this.ref.close();
  }
}
