import { Component, OnInit } from '@angular/core';
import { ScientifiqueAttributes } from 'src/app/models/scientifique.model';
import { ScientifiqueService } from 'src/app/services/scientifique.service';
import { AbstractFormComponent } from 'src/app/share/class/abstactForm.component';

@Component({
  selector: 'app-create-scientifique-form',
  templateUrl: './create-scientifique-form.component.html',
  styleUrls: ['./create-scientifique-form.component.css']
})
export class CreateScientifiqueFormComponent extends AbstractFormComponent implements OnInit {
  
  
  override values:ScientifiqueAttributes={
    nom: '',
    prenom: '',
    specialite: '',
    telephone: '',
    email: ''
  }

  constructor(
    private scientifiqueService:ScientifiqueService,
  ) {
    super(scientifiqueService);
  }

  get formValid(): boolean { throw true; }

  ngOnInit(): void {
  }

  override onReset(){
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
