import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { EntityContainer, PaginatedData } from 'src/app/models/entityContainer.model';
import { SiteAttributes } from 'src/app/models/localisation.model';
import { myEnv } from 'src/environments/myEnv';

@Injectable({
  providedIn: 'root'
})
export class SiteService {
  private  _data!:PaginatedData<EntityContainer<SiteAttributes>>;
  constructor(private http:HttpClient) { }
  get sites(){
    return this._data;
  }
  public index(id:number){
    return this.http.get<PaginatedData<EntityContainer<SiteAttributes>>>(`${myEnv.urls.parent}/${id}/regions`)
    .pipe(tap({
      next:(reponse)=>{this._data = reponse}
    }));
  }
}
