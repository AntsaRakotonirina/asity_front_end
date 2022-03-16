import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { myEnv } from 'src/environments/myEnv';
import { AnimalAttributes } from '../models/animal.model';
import { SearchRequest } from '../models/requests/searchRequest.model';
import { AbstractService } from './Abstract.service';

@Injectable({
  providedIn: 'root'
})
export class AnimalService extends AbstractService<AnimalAttributes>{
  public override url: string = myEnv.urls.animal;
  protected override defaultAttribute: string = 'nom';
  constructor(protected override http:HttpClient,protected override messageService:MessageService) {
    super(http,messageService);
  }

  public get animals(){
    return this._data;
  }

  public autoComplete(request:SearchRequest ){
    return this.http.get<{value:string}[]>(myEnv.urls.autocomplete+'/animaux?attribute='+request.attribute+"&search="+request.search);
  }
}