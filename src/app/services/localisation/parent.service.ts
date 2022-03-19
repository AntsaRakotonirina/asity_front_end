import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { EntityContainer, PaginatedData } from 'src/app/models/entityContainer.model';
import { ParentAttributes, RegionAttributes } from 'src/app/models/localisation.model';
import { myEnv } from 'src/environments/myEnv';

@Injectable({
  providedIn: 'root'
})
export class ParentService {
  private  _data!:PaginatedData<EntityContainer<ParentAttributes>>;
  constructor(private http:HttpClient) { }
  get parents(){
    return this._data;
  }
  public index(){
    return this.http.get<PaginatedData<EntityContainer<ParentAttributes>>>(myEnv.urls.parent)
    .pipe(tap({
      next:(reponse)=>{this._data=reponse}
    }));
  }

  public region(id:number){
    return this.http.get<PaginatedData<EntityContainer<RegionAttributes>>>(`${myEnv.urls.parent}/${id}/regions`);
  }
}
