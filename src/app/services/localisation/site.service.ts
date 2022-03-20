import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Observable, tap } from 'rxjs';
import { EntityContainer, PaginatedData } from 'src/app/models/entityContainer.model';
import { SiteAttributes } from 'src/app/models/localisation.model';
import { DataMessage, MessageModel } from 'src/app/models/message.model';
import { SiteRequest } from 'src/app/models/requests/localisationRequest.model';
import { myEnv } from 'src/environments/myEnv';
import { RestInterface } from '../restInterface.service';

@Injectable({
  providedIn: 'root'
})
export class SiteService implements RestInterface {
  private  _data:PaginatedData<EntityContainer<SiteAttributes>>|null=null;
  constructor(private http:HttpClient,private messageService:MessageService) { }
  
  get sites(){
    return this._data;
  }

  public index(id:number){
    return this.http.get<PaginatedData<EntityContainer<SiteAttributes>>>(`${myEnv.urls.region}/${id}/sites`)
    .pipe(tap({
      next:(reponse)=>{this._data = reponse}
    }));
  }

  public store(payload:SiteRequest): Observable<DataMessage<EntityContainer<SiteAttributes>>> {
    return this.http.post<DataMessage<EntityContainer<SiteAttributes>>>(myEnv.urls.site,payload)
    .pipe(tap({
      next:()=>{this.messageService.add({severity:'success',summary:'Site crée'})},
      error:(error)=>{this.messageService.add({severity:'error',summary:'Erreur de creation',detail:'Impossible de crée ce site veuillez réessayer ultérieurement ou rechargez la page'})}
    }));
  }

  public update(data: SiteRequest , id: number): Observable<DataMessage<EntityContainer<SiteAttributes>>> {
    return this.http.put<DataMessage<EntityContainer<SiteAttributes>>>(myEnv.urls.site+'/'+id,data)
    .pipe(tap({
      next:()=>{this.messageService.add({severity:'success',summary:'Site Mis a jour'})},
      error:(error)=>{this.messageService.add({severity:'error',summary:'Erreur de creation',detail:'Impossible de metre a jour ce site veuillez réessayer ultérieurement ou rechargez la page'})}
    }));
  }

  public show(id: number): Observable<unknown> {
    return this.http.get<EntityContainer<SiteAttributes>>(myEnv.urls.site+'/'+id);
  }

  public destroy(id: number): Observable<MessageModel> {
    return this.http.delete<MessageModel>(myEnv.urls.site+'/'+id)
    .pipe(tap({
      next:()=>{this.messageService.add({severity:'success',summary:'Site Parent supprimer'})},
      error:(error)=>{this.messageService.add({severity:'error',summary:'Erreur de suppression',detail:'Impossible de supprimer cette region veuillez réessayer ultérieurement ou rechargez la page'})}
    }));
  }

  public purge(){
    this._data = null;
  }
}
