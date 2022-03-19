import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { animalFormsAttributes } from 'src/app/models/animal.model';
import { SearchRequest } from 'src/app/models/requests/searchRequest.model';
import { AnimalService } from 'src/app/services/animal.service';

@Component({
  selector: 'app-create-animal-form',
  templateUrl: './create-animal-form.component.html',
  styleUrls: ['../../form.component.css','./create-animal-form.component.css']
})
export class CreateAnimalFormComponent implements OnInit {
  values:animalFormsAttributes={
    categorie: '',
    endemicite: '',
    espece: '',
    famille: '',
    genre: '',
    guild: '',
    status: 'EN',
    count_type: 'nombre'
  }
  
  _statusList:string[]=[
    'EX',
    'EW',
    'CR',
    'EN',
    'VU',
    'NT',
    'LC',
  ]

  _countOptions:any[]=[{label:'Nombre',value:'nombre'},{label:'Abondance',value:'abondance'},{label:'Présence',value:'presence'}];

  suggestions:string[]=[];

  constructor(
    private animalService:AnimalService,
    private ref:DynamicDialogRef
  ) { }
  
  ngOnInit(): void {
  }

  get formValid(){
    return this.values.espece.length > 0 &&
    this.values.famille.length > 0 &&
    this.values.genre.length > 0
  }

  /**
   * Autocompletion des champs saisis
   * @param event 
   * @param attribute 
   */
  onSearch(event:{onriginalEvent:InputEvent,query:string},attribute:string){
    const request:SearchRequest = {attribute:attribute,search:event.query}
    this.animalService.autoComplete(request)
    .subscribe({
      next:(response)=>{
        const newSuggestion:string[]=[];
        response.forEach((item)=>{
          newSuggestion.push(item.value);
        })
        this.suggestions = newSuggestion;
      }
    })
  }

  onSubmit(){
    this.animalService.store(this.values)
    .subscribe({
      next:()=>{
        this.ref.close();
      },
      error:(error)=>{}
    });
  }

  onReset(){
    this.ref.close();
  }
}

