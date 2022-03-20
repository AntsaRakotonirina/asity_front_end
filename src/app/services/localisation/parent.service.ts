import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Observable, tap } from 'rxjs';
import { EntityContainer, PaginatedData } from 'src/app/models/entityContainer.model';
import { ParentAttributes, RegionAttributes } from 'src/app/models/localisation.model';
import { DataMessage, MessageModel } from 'src/app/models/message.model';
import { ParentRequest } from 'src/app/models/requests/localisationRequest.model';
import { myEnv } from 'src/environments/myEnv';
import { RestInterface } from '../restInterface.service';

@Injectable({
  providedIn: 'root'
})
export class ParentService implements RestInterface{
  private  _data:PaginatedData<EntityContainer<ParentAttributes>>|null = null;
  constructor(private http:HttpClient,private messageService:MessageService) { }

  get parents(){
    return this._data;
  }

  public index(){
    return this.http.get<PaginatedData<EntityContainer<ParentAttributes>>>(myEnv.urls.parent)
    .pipe(tap({
      next:(reponse)=>{this._data=reponse}
    }));
  }

  public store(payload:ParentRequest): Observable<DataMessage<EntityContainer<ParentAttributes>>> {
    return this.http.post<DataMessage<EntityContainer<ParentAttributes>>>(myEnv.urls.parent,payload)
    .pipe(tap({
      next:()=>{this.messageService.add({severity:'success',summary:'Site Parent crée'})},
      error:(error)=>{this.messageService.add({severity:'error',summary:'Erreur de creation',detail:'Impossible de crée ce site veuillez réessayer ultérieurement ou rechargez la page'})}
    }));
  }

  public update(data: ParentRequest, id: number): Observable<DataMessage<EntityContainer<ParentAttributes>>> {
    return this.http.put<DataMessage<EntityContainer<ParentAttributes>>>(myEnv.urls.parent+'/'+id,data)
    .pipe(tap({
      next:()=>{this.messageService.add({severity:'success',summary:'Site Parent mis a jour'})},
      error:(error)=>{this.messageService.add({severity:'error',summary:'Erreur de modification',detail:'Impossible de modifier ce site veuillez réessayer ultérieurement ou rechargez la page'})}
    }));
  }

  public show(id: number): Observable<EntityContainer<ParentAttributes>> {
    return this.http.get<EntityContainer<ParentAttributes>>(myEnv.urls.parent+'/'+id);
  }

  public destroy(id: number): Observable<unknown> {
    return this.http.delete<MessageModel>(myEnv.urls.parent+'/'+id)
    .pipe(tap({
      next:()=>{this.messageService.add({severity:'success',summary:'Site Parent supprimer'})},
      error:(error)=>{this.messageService.add({severity:'error',summary:'Erreur de suppression',detail:'Impossible de supprimer ce site veuillez réessayer ultérieurement ou rechargez la page'})}
    }));
  }
  
  public region(id:number){
    return this.http.get<PaginatedData<EntityContainer<RegionAttributes>>>(`${myEnv.urls.parent}/${id}/regions`);
  }

  public purge(){
    this._data=null;
  }
}
