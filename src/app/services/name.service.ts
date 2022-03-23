import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { tap } from 'rxjs';
import { myEnv } from 'src/environments/myEnv';

@Injectable({
  providedIn: 'root'
})
export class NameService{

  constructor(private http:HttpClient,private messageService:MessageService) { }

  getName(type:string,id:number){
    return this.http.get(`${myEnv.urls.name}/${type}/${id}`);
  }

  deleteName(type:string,id:number){
    return this.http.delete(`${myEnv.urls.name}/${type}/${id}`)
    .pipe(tap({
      next:()=>{this.messageService.add({severity:'success',summary:'Nom supprimer'})},
      error:(error)=>{this.messageService.add({severity:'error',summary:'Erreur de suppression',detail:'Impossible de supprimer ce nom veuillez réessayer ultérieurement ou rechargez la page'})}
    }));
  }
}
