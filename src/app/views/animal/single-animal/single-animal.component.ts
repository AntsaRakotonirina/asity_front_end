import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { SingleAnimalAttributes } from 'src/app/models/animal.model';
import { SingleEntityContainer } from 'src/app/models/entityContainer.model';
import { animalUpdateRequest } from 'src/app/models/requests/animalRequest.model';
import { SearchRequest } from 'src/app/models/requests/searchRequest.model';
import { AnimalService } from 'src/app/services/animal.service';
import { NoteService } from 'src/app/services/note.service';
@Component({
  selector: 'app-single-animal',
  templateUrl: './single-animal.component.html',
  styleUrls: ['./single-animal.component.css']
})
export class SingleAnimalComponent implements OnInit {

  _animal!:SingleEntityContainer<SingleAnimalAttributes>;
  _analyseData:any[]=[]
  
  _openAnalyse:boolean = false;
  _updateRequest:animalUpdateRequest={
    curent_name_id: 0,
    categorie: '',
    endemicite: '',
    espece: '',
    famille: '',
    genre: '',
    guild: '',
    status: '',
    count_type: 'nombre'
  };
  _initialUpdateRequest!:animalUpdateRequest; //Copie des attribue d'un animal utilie notament pour les diff
  _newNoteTitle:string="";
  _newNoteValue:string="";

  suggestions:string[]=[];

  get attributes(){
    return this._animal.data.attributes;
  }

  /**
   * Detecte le changement d'attribut
   */
  get isAttributesChanged(){
    if(this._initialUpdateRequest && this._updateRequest){
      return JSON.stringify(this._updateRequest)!==JSON.stringify(this._initialUpdateRequest);
    }
    return false;
  }

  constructor(
    private animalService:AnimalService,
    private route:ActivatedRoute,
    private noteService:NoteService,
    private confirmationService:ConfirmationService
  ) { }

  ngOnInit(): void {
    this.init();

  }


  /**
   * Recharge l'animal en court depuis le back-end
   * @note Il est utiliser en cas d'erreur de modification
   */
  refreshAnimal(){
    this.route.paramMap.subscribe({next:(params)=>{
      const id:unknown = params.get('id');
      if(id)
        this.animalService.show(id as number).subscribe({
          next:(response)=>{
            this._animal = response;
            this.copyAttributesToRequest(this._animal.data.attributes ,this._updateRequest);
            this._initialUpdateRequest = {...this._updateRequest};
            this.getAnalyse();
          }
        });
    }})
  }

  /**
   * Combine toute la logique de reinitialisation du composant
   * @note Utiliser pour une reinitialisation total
   */
  init(){
    this.refreshAnimal();
  }

  copyAttributesToRequest(from:SingleAnimalAttributes,to:animalUpdateRequest){
    to.categorie      = from.categorie;
    to.endemicite     = from.endemicite;
    to.guild          = from.guild;
    to.famille        = from.famille;
    to.espece         = from.espece;
    to.genre          = from.genre;
    to.status         = from.status;
    to.count_type     = from.count_type;
    to.curent_name_id = from.curent_name_id;
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

  /**
   * @event
   * Quand on change un attribut de l'animal (categorie, espece, etc...)
   */
  onChangeAttributes(){
    if(this.isAttributesChanged){
      //on active le flag de changement sur le service
      this.animalService.isEdit = true;
    }
  }

  /**
   * @event
   * Se declanche quand on met a jour les attribut de l'animal
   */
  onUpdate(){
    this.animalService.update({data: this._updateRequest,id:this._animal.data.id}).subscribe({
      next:(response)=>{
        this.refreshAnimal();
      },
      error:()=>{}
    })
  }

  /**
   * @event
   * Se declanche quand on annulle les modifications d'attribus
   */
  onReset(){
    this._updateRequest = {...this._initialUpdateRequest};
    this.animalService.isEdit = false;
  }

  /**
   * @event
   * Se declanche quand on clique sur le bouton d'analyse 
   */
  getAnalyse(){
    this.animalService.analyse(this._animal.data.id).subscribe(
      (response:any)=>{
        this._analyseData = response ;
      }
    );
  }

  /**
   * @event
   * Ajoute une note su l'animal
   */
  onAddNotes(){
    this.animalService.addNote({titre:this._newNoteTitle,valeur:this._newNoteValue},this._animal.data.id)
    .subscribe({
      next:(response)=>{
        this._animal.data.attributes.notes.push(response.data);
      }
    });
  }
  
  /**
   * @event
   * Supprime une note
   */
  onDeleteNotes(id:number){
    this.confirmationService.confirm({
      message: "Supprimer la note ?",
      acceptLabel: "Supprimer",
      icon:"pi pi-exclamation-triangle",
      rejectLabel: "Annuler",
      accept:()=>{
        this.noteService.destroy(id).subscribe({
          next:()=>{
            const index = this.attributes.notes.findIndex((note) =>note.id === id);
            if(index >= 0){
              this.attributes.notes.splice(index,1);
            }
          }
        });
      }
    })
  }

  onChangeName(id:number){
    this._updateRequest.curent_name_id = id;
    this.onUpdate();
  }
}
