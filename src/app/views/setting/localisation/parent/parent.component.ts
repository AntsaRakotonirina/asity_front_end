import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { UpdateParentComponent } from 'src/app/forms/localisation/parent/update-parent/update-parent.component';
import { EntityContainer } from 'src/app/models/entityContainer.model';
import { ParentAttributes } from 'src/app/models/localisation.model';
import { ParentRequest } from 'src/app/models/requests/localisationRequest.model';
import { ParentService } from 'src/app/services/localisation/parent.service';
import { ParentInfoComponent } from './parent-info/parent-info.component';


@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['../localisation.component.css','./parent.component.css']
})
export class ParentComponent implements OnInit {

  _createFormOpen:boolean=false;

  request: ParentRequest={
    aireProteger: '',
    pays: '',
    abreviation: '',
    latitude: 0,
    longitude: 0
  };

  parentId:number = -1;
  @Output() select:EventEmitter<number> = new EventEmitter<number>();
  @Output() delete:EventEmitter<number> = new EventEmitter<number>();

  constructor(
    private parentService:ParentService,
    private confirmationService:ConfirmationService,
    private dialogService:DialogService
  ) { }

  get parents(){
    return this.parentService.parents;
  }
  
  ngOnInit(): void {
    this.init();
  }

  init(){
    this.index()
  }

  index(){
    this.parentService.index().subscribe();
  }

  onSelect(id:number){
    this.parentId = id;
    this.select.emit(this.parentId);
  }

  onUpdate(parent:EntityContainer<ParentAttributes>){
    this.dialogService.open(UpdateParentComponent,{
      header:"Metre a jour le parent",
      data:{parent:parent}
    })
  }

  onInfo(parent:EntityContainer<ParentAttributes>){
    this.dialogService.open(ParentInfoComponent,{
      header:"Information",
      data:{parent:parent}
    })
  }

  onDelete(id:number){
    this.confirmationService.confirm({
      header:"Supprimer le site parent ?",
      message:"Supprimer ce parent entraine la suppression des regions et des sites qu'il contient ",
      accept:()=>{this.delete.emit(id)}
    })
  }
}
