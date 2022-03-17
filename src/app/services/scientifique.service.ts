import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { myEnv } from 'src/environments/myEnv';
import { ScientifiqueAttributes } from '../models/scientifique.model';
import { AbstractService } from './Abstract.service';

@Injectable({
  providedIn: 'root'
})
export class ScientifiqueService extends AbstractService<ScientifiqueAttributes> {
  public override url: string= myEnv.urls.scientifique;

  protected override valueName:string = 'Scientifique';
  protected override updateMessage: string = "Le scientifique a ete mis a jour";
  protected override deleteMessage: string = "Le scientifique a ete supprimer";
  protected override storeMessage: string = "Le scientifique a ete crée";

  constructor(
    protected override http:HttpClient,
    protected override messageService:MessageService) {
    super(http,messageService);
  }

  public get scientifiques(){
    return this._data;
  }
}
