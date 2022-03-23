import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { tap } from 'rxjs';
import { myEnv } from 'src/environments/myEnv';
import { AnimalAttributes, SingleAnimalAttributes } from '../models/animal.model';
import { EntityContainer, PaginatedData, SingleEntityContainer } from '../models/entityContainer.model';
import { DataMessage } from '../models/message.model';
import { ComNameAttributes, SciNameAttributes, VerNameAttributes } from '../models/name.model';
import { NoteAttributes } from '../models/note.model';
import { animalUpdateRequest } from '../models/requests/animalRequest.model';
import { SearchRequest } from '../models/requests/searchRequest.model';
import { AbstractService } from './Abstract.service';

@Injectable({
  providedIn: 'root'
})
export class AnimalService extends AbstractService<AnimalAttributes>{
  public override url: string = myEnv.urls.animal;
  protected override defaultAttribute: string = 'nom';

  protected override valueName:string = 'Animal';
  protected override updateMessage: string = "L'animal a ete mis a jour";
  protected override deleteMessage: string = "L'animal a ete supprimer";
  protected override storeMessage: string = "L'animal a ete crée";
  
  public isEdit:boolean=false // Flag pour savoir si un animal est en cour d'edit ou non

  public get animals(){
    return this._data;
  }

  constructor(
    protected override http:HttpClient,
    protected override messageService:MessageService) {
    super(http,messageService);
  }
  

  public autoComplete(request:SearchRequest ){
    return this.http.get<{value:string}[]>(myEnv.urls.autocomplete+'/animaux?attribute='+request.attribute+"&search="+request.search);
  }
  
  public show(id:number){
    return this.http.get<SingleEntityContainer<SingleAnimalAttributes>>(myEnv.urls.animal+'/'+id);
  }

  public override update(request:animalUpdateRequest,id:number){
    return this.http.put<DataMessage<SingleEntityContainer<SingleAnimalAttributes>>>(this.url+'/'+id,request)
    .pipe(tap({
      next:()=>{
        this.messageService.add({severity:'success',summary:"Mis a jour réussi !",detail:this.updateMessage})
      },
      error:()=>{}
    }));
  }

  public addVername(data:any,id:number){
    return this.http.post<DataMessage<EntityContainer<VerNameAttributes>>>(myEnv.urls.animal+'/'+id+'/nom/vernaculaires',data)
    .pipe(tap({
      next:()=>{this.messageService.add({severity:'success',summary:'Nom Ajouter'})},
      error:(error)=>{this.messageService.add({severity:'error',summary:'Erreur de creation',detail:'Impossible de crée ce nom veuillez réessayer ultérieurement ou rechargez la page'})}
    }));
  }

  public addCommname(data:any,id:number){
    return this.http.post<DataMessage<EntityContainer<ComNameAttributes>>>(myEnv.urls.animal+'/'+id+'/nom/communs',data)
    .pipe(tap({
      next:()=>{this.messageService.add({severity:'success',summary:'Nom Ajouter'})},
      error:(error)=>{this.messageService.add({severity:'error',summary:'Erreur de creation',detail:'Impossible de crée ce nom veuillez réessayer ultérieurement ou rechargez la page'})}
    }));
  }

  public addSciname(data:any,id:number){
    return this.http.post<DataMessage<EntityContainer<SciNameAttributes>>>(myEnv.urls.animal+'/'+id+'/nom/scientifiques',data)
    .pipe(tap({
      next:()=>{this.messageService.add({severity:'success',summary:'Nom Ajouter'})},
      error:(error)=>{this.messageService.add({severity:'error',summary:'Erreur de creation',detail:'Impossible de crée ce nom veuillez réessayer ultérieurement ou rechargez la page'})}
    }));
  }

  public addNote(data:NoteAttributes,id:number){
    return this.http.post<DataMessage<EntityContainer<NoteAttributes>>>(myEnv.urls.animal+'/'+id+'/notes',data)
    .pipe(tap({
      next:()=>{this.messageService.add({severity:'success',summary:'Note Ajouter'})},
      error:(error)=>{this.messageService.add({severity:'error',summary:'Erreur de creation',detail:'Impossible d\'ajouter cette note veuillez réessayer ultérieurement ou rechargez la page'})}
    }));
  }

  public analyse(id:number){
    return this.http.get<{x:number,y:string}[]>(myEnv.urls.analyse+'/animaux/'+id);
  }
}