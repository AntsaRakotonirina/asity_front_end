import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { EntityContainer } from 'src/app/models/entityContainer.model';
import { ParentAttributes } from 'src/app/models/localisation.model';
import { ParentRequest } from 'src/app/models/requests/localisationRequest.model';
import { ParentService } from 'src/app/services/localisation/parent.service';

@Component({
  selector: 'app-update-parent',
  templateUrl: './update-parent.component.html',
  styleUrls: ['../../form.component.css','./update-parent.component.css']
})
export class UpdateParentComponent implements OnInit {
  _parent!:EntityContainer<ParentAttributes>

  _request:ParentRequest={
    aireProteger: '',
    pays: 'MADAGASCAR',
    abreviation: '',
    latitude: 0.00,
    longitude: 0.00
  }

  get isValid(){
    return this._request.aireProteger.length > 0 &&
    this._request.pays.length > 0 &&
    this._request.abreviation.length > 0
  }

  constructor(
    private parentService:ParentService,
    private ref:DynamicDialogRef,
    private config:DynamicDialogConfig
  ) { }

  ngOnInit(): void {
    this._parent = this.config.data.parent;
    if(this._parent){
      this._request = {...this._parent.attributes};
    }else{
      this.ref.close();
    }
  }
  
  generateAbreviation(){
    const apWords = this._request.aireProteger.split(' ');
    let newAbv = '';
    apWords.forEach((word)=>{
      if(word)
        newAbv += word[0];
    })

    this._request.abreviation = newAbv;
  }

  onReset(){
    this.ref.close();
  }

  onUpdate(){
    this.parentService.update({data:this._request,id:this._parent.id}).subscribe({
      next:()=>{this.ref.close()}
    });
  }

}
