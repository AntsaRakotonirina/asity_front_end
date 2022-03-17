import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { myEnv } from 'src/environments/myEnv';

@Component({
  selector: 'app-upload',
  templateUrl: './upload-component.component.html',
  styleUrls: ['./upload-component.component.css']
})
export class UploadComponent implements OnInit {
  url:string = myEnv.urls.base;
  constructor(
    private ref:DynamicDialogRef,
    private config:DynamicDialogConfig,
    private messageService:MessageService
  ) { }

  ngOnInit(): void {
    if (this.config.data) {
      this.url = this.config.data.url;
    }
    
  }

  onError(){
    this.messageService.add({severity:'error',summary:"Echec",detail:"l'envoie du fichier a echouer"})
  }
  onUpload(){
    this.messageService.add({severity:'success',summary:"Envoyer !",detail:"le fichier a bien été envoyer"})
  }
}
