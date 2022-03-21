import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { map, Observable, tap } from 'rxjs';
import { myEnv } from 'src/environments/myEnv';
import { EntityContainer, PaginatedData } from '../models/entityContainer.model';
import { DataMessage, MessageModel } from '../models/message.model';
import { NoteAttributes } from '../models/note.model';
import { SuiviRequest } from '../models/requests/suiviRequest.model.model';
import { SuiviAttributes, SuiviSingleAttributes } from '../models/suivi.model';
import { RestInterface } from './restInterface.service';

@Injectable({
  providedIn: 'root'
})
export class SuiviService implements RestInterface{
  private _data:PaginatedData<EntityContainer<SuiviAttributes>>|null= null;
  constructor(
    private http:HttpClient,
    private messageService:MessageService
  ) { }
  get suivis(){
    return this._data;
  }

  public index(page?:number,filter?:{from:string,to:string}): Observable<PaginatedData<EntityContainer<SuiviAttributes>>>{
    
    let url = myEnv.urls.suivi;

    if(page){
      url = url+'?page='+page;
    }
    if(filter){
      url = url+'&from='+filter.from+'&to='+filter.to;
    }

    return this.http.get<PaginatedData<EntityContainer<SuiviAttributes>>>(url)
    .pipe(map((result)=>{
      this._data=result;
      return result;
    }));
  }

  public store(payload:SuiviRequest): Observable<DataMessage<EntityContainer<SuiviAttributes>>> {
    return this.http.post<DataMessage<EntityContainer<SuiviAttributes>>>(myEnv.urls.suivi,payload)
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
      next:()=>{
        this.messageService.add({severity:'success',summary:'Suivi supprimer'});
        if(this._data?.data){
          const index = this._data.data.findIndex((item)=>{return item.id === id})
          if(index > 0)
            this._data.data.splice(index,1);
        }
      },
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
