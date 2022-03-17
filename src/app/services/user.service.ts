import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { myEnv } from 'src/environments/myEnv';
import { UserAttributes } from '../models/user.model';
import { AbstractService } from './Abstract.service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends AbstractService<UserAttributes>{
  public override url: string = myEnv.urls.user;

  protected override valueName:string = 'Utilisateur';
  protected override updateMessage: string = "L'utilisateur a ete mis a jour";
  protected override deleteMessage: string = "L'utilisateur a ete supprimer";
  protected override storeMessage: string = "L'utilisateur a ete crée";
  
  constructor(
    protected override http:HttpClient,
    protected override messageService:MessageService) {
    super(http,messageService);
  }

  public get users(){
    return this._data;
  }

}
