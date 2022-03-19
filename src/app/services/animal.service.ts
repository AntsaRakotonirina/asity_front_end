import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { tap } from 'rxjs';
import { myEnv } from 'src/environments/myEnv';
import { AnimalAttributes, SingleAnimalAttributes } from '../models/animal.model';
import { EntityContainer, PaginatedData } from '../models/entityContainer.model';
import { ComNameAttributes, SciNameAttributes, VerNameAttributes } from '../models/name.model';
import { NoteAttributes } from '../models/note.model';
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
  
  constructor(
    protected override http:HttpClient,
    protected override messageService:MessageService) {
    super(http,messageService);
  }

  public get animals(){
    return this._data;
  }

  public autoComplete(request:SearchRequest ){
    return this.http.get<{value:string}[]>(myEnv.urls.autocomplete+'/animaux?attribute='+request.attribute+"&search="+request.search);
  }
  
  public show(id:number){
    return this.http.get<EntityContainer<SingleAnimalAttributes>>(myEnv.urls.animal+'/'+id);
  }

  public addVername(data:any,id:number){
    return this.http.post<EntityContainer<VerNameAttributes>>(myEnv.urls.name+'/'+id+'/nom/varnaculaires',data)
    .pipe(tap({
      next:()=>{this.messageService.add({severity:'success',summary:'Nom Ajouter'})},
      error:(error)=>{this.messageService.add({severity:'error',summary:'Erreur de creation',detail:'Impossible de crée ce nom veuillez réessayer ultérieurement ou rechargez la page'})}
    }));
  }

  public addCommname(data:any,id:number){
    return this.http.post<EntityContainer<ComNameAttributes>>(myEnv.urls.name+'/'+id+'/nom/communs',data)
    .pipe(tap({
      next:()=>{this.messageService.add({severity:'success',summary:'Nom Ajouter'})},
      error:(error)=>{this.messageService.add({severity:'error',summary:'Erreur de creation',detail:'Impossible de crée ce nom veuillez réessayer ultérieurement ou rechargez la page'})}
    }));
  }

  public addSciname(data:any,id:number){
    return this.http.post<EntityContainer<SciNameAttributes>>(myEnv.urls.name+'/'+id+'/nom/scientifiques',data)
    .pipe(tap({
      next:()=>{this.messageService.add({severity:'success',summary:'Nom Ajouter'})},
      error:(error)=>{this.messageService.add({severity:'error',summary:'Erreur de creation',detail:'Impossible de crée ce nom veuillez réessayer ultérieurement ou rechargez la page'})}
    }));
  }

  public addNote(data:any,id:number){
    return this.http.post<EntityContainer<NoteAttributes>>(myEnv.urls.suivi+'/'+id+'/notes',data)
    .pipe(tap({
      next:()=>{this.messageService.add({severity:'success',summary:'Note Ajouter'})},
      error:(error)=>{this.messageService.add({severity:'error',summary:'Erreur de creation',detail:'Impossible d\'ajouter cette note veuillez réessayer ultérieurement ou rechargez la page'})}
    }));
  }
}