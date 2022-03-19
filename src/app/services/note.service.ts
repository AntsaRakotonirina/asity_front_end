import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { tap } from 'rxjs';
import { myEnv } from 'src/environments/myEnv';
import { MessageModel } from '../models/message.model';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor(
    private http:HttpClient,
    private messageService:MessageService
  ) { }

  public destroy(id:number){
    return this.http.delete<MessageModel>(myEnv.urls.note+'/'+id)
    .pipe(tap({
      next:()=>{this.messageService.add({severity:'success',summary:'Note supprimer'})},
      error:(error)=>{this.messageService.add({severity:'error',summary:'Erreur de suppression',detail:'Impossible de supprimer cette note veuillez réessayer ultérieurement ou rechargez la page'})}
    }));
  }
}
