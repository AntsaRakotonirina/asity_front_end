import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { EntityContainer, PaginatedData } from 'src/app/models/entityContainer.model';
import { RegionAttributes } from 'src/app/models/localisation.model';
import { myEnv } from 'src/environments/myEnv';

@Injectable({
  providedIn: 'root'
})
export class RegionService {
  private  _data!:PaginatedData<EntityContainer<RegionAttributes>>;
  constructor(private http:HttpClient) { }

  get regions(){
    return this._data;
  }
  public index(id:number){
    return this.http.get<PaginatedData<EntityContainer<RegionAttributes>>>(`${myEnv.urls.parent}/${id}/regions`)
    .pipe(tap({
      next:(reponse)=>{this._data = reponse}
    }));
  }
}
