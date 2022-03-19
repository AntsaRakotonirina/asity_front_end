import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Observable, tap } from 'rxjs';
import { myEnv } from 'src/environments/myEnv';
import { EntityContainer, PaginatedData } from '../models/entityContainer.model';
import { DataMessage, MessageModel } from '../models/message.model';
import { NoteAttributes } from '../models/note.model';
import { SuiviAttributes, SuiviSingleAttributes } from '../models/suivi.model';
import { RestInterface } from './restInterface.service';

@Injectable({
  providedIn: 'root'
})
export class SuiviService implements RestInterface{

  constructor(
    private http:HttpClient,
    private messageService:MessageService
  ) { }

  public index(): Observable<PaginatedData<EntityContainer<SuiviAttributes>>> {
    return this.http.get<PaginatedData<EntityContainer<SuiviAttributes>>>(myEnv.urls.suivi);
  }

  public store(payload:any): Observable<DataMessage<EntityContainer<SuiviAttributes>>> {
    return this.http.put<DataMessage<EntityContainer<SuiviAttributes>>>(myEnv.urls.suivi,payload)
    .pipe(tap({
      next:()=>{this.messageService.add({severity:'success',summary:'Suivi crée'})},
      error:(error)=>{this.messageService.add({severity:'error',summary:'Erreur de creation',detail:'Impossible de crée cette suivi veuillez réessayer ultérieurement ou rechargez la page'})}
    }));
  }
  
  public update(data: any, id: number): Observable<DataMessage<EntityContainer<SuiviAttributes>>> {
    return this.http.put<DataMessage<EntityContainer<SuiviAttributes>>>(myEnv.urls.suivi+'/'+id,data)
    .pipe(tap({
      next:()=>{this.messageService.add({severity:'success',summary:'Suivi mis a jour'})},
      error:(error)=>{this.messageService.add({severity:'error',summary:'Erreur de mis a jour',detail:'Impossible de metre a jour cette suivi veuillez réessayer ultérieurement ou rechargez la page'})}
    }));
  }
  
  public show(id: number): Observable<DataMessage<EntityContainer<SuiviSingleAttributes>>> {
    return this.http.get<DataMessage<EntityContainer<SuiviSingleAttributes>>>(myEnv.urls.suivi+'/'+id)
  }

  public destroy(id: number): Observable<MessageModel> {
    return this.http.delete<MessageModel>(myEnv.urls.suivi+'/'+id)
    .pipe(tap({
      next:()=>{this.messageService.add({severity:'success',summary:'Suivi supprimer'})},
      error:(error)=>{this.messageService.add({severity:'error',summary:'Erreur de suppression',detail:'Impossible de supprimer cette suivi veuillez réessayer ultérieurement ou rechargez la page'})}
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
