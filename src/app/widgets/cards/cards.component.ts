import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ConfirmationService, MenuItem } from 'primeng/api';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {
  @Input() id:number = 0;
  @Input() isEditable:boolean = false;
  @Input() isDeletable:boolean = false;
  @Output() delete:EventEmitter<any> = new EventEmitter();
  @Output() info:EventEmitter<any> = new EventEmitter();
  @Output() edit:EventEmitter<any> = new EventEmitter();

  _menuItems: MenuItem[]=[];
  
  constructor(private confirmService:ConfirmationService) { }

  ngOnInit(): void {
    if(this.isDeletable){
      this._menuItems.push({label:"Supprimer",icon:'pi pi-fw pi-trash',command:()=>{this.onDelete()}})
    }
    if(this.isEditable){
      this._menuItems.push({label:"Editer",icon:'pi pi-fw pi-pencil',command:()=>{this.onEdit()}})
    }
    this._menuItems.push({label:"Information",icon:'pi pi-fw pi-info-circle',command:()=>{this.onInfo()}})
  }

  onDelete(){
    this.confirmService.confirm({
      header: "Supprimer ?",
      message:"Etes vous sur de cette suppression ?",
      accept:()=>{this.delete.emit(this.id);}
    })
  }

  onEdit(){
    this.edit.emit(this.id);
  }

  onInfo(){
    this.info.emit(this.id);
  }
}
