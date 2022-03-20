import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Observable, tap } from 'rxjs';
import { EntityContainer, PaginatedData } from 'src/app/models/entityContainer.model';
import { RegionAttributes } from 'src/app/models/localisation.model';
import { DataMessage, MessageModel } from 'src/app/models/message.model';
import { RegionRequest } from 'src/app/models/requests/localisationRequest.model';
import { myEnv } from 'src/environments/myEnv';
import { RestInterface } from '../restInterface.service';

@Injectable({
  providedIn: 'root'
})
export class RegionService implements RestInterface {

  private  _data:PaginatedData<EntityContainer<RegionAttributes>>|null=null;
  constructor(private http:HttpClient,private messageService:MessageService) { }

  get regions(){
    return this._data;
  }

  public index(id:number):Observable<PaginatedData<EntityContainer<RegionAttributes>>>{
    return this.http.get<PaginatedData<EntityContainer<RegionAttributes>>>(`${myEnv.urls.parent}/${id}/regions`)
    .pipe(tap({
      next:(reponse)=>{this._data = reponse}
    }));
  }

  public store(payload:RegionRequest): Observable<DataMessage<EntityContainer<RegionAttributes>>> {
    return this.http.post<DataMessage<EntityContainer<RegionAttributes>>>(myEnv.urls.region,payload)
    .pipe(tap({
      next:()=>{this.messageService.add({severity:'success',summary:'Region crée'})},
      error:(error)=>{this.messageService.add({severity:'error',summary:'Erreur de creation',detail:'Impossible de crée cette region veuillez réessayer ultérieurement ou rechargez la page'})}
    }));
  }

  public update(data:RegionRequest, id: number): Observable<DataMessage<EntityContainer<RegionAttributes>>> {
    return this.http.put<DataMessage<EntityContainer<RegionAttributes>>>(myEnv.urls.region+'/'+id,data)
    .pipe(tap({
      next:()=>{this.messageService.add({severity:'success',summary:'Region crée'})},
      error:(error)=>{this.messageService.add({severity:'error',summary:'Erreur de mis a jour',detail:'Impossible de crée cette region veuillez réessayer ultérieurement ou rechargez la page'})}
    }));
  }

  public show(id: number): Observable<EntityContainer<RegionAttributes>> {
    return this.http.get<EntityContainer<RegionAttributes>>(myEnv.urls.region+'/'+id);
  }

  public destroy(id: number): Observable<MessageModel> {
    return this.http.delete<MessageModel>(myEnv.urls.region+'/'+id)
    .pipe(tap({
      next:()=>{this.messageService.add({severity:'success',summary:'Site Parent supprimer'})},
      error:(error)=>{this.messageService.add({severity:'error',summary:'Erreur de suppression',detail:'Impossible de supprimer cette region veuillez réessayer ultérieurement ou rechargez la page'})}
    }));
  }

  public purge(){
    this._data = null;
  }
}
