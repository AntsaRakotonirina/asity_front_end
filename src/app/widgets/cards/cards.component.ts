import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {
  @Input() id:number = 0;
  @Input() isEditable:boolean = true;
  @Output() delete:EventEmitter<any> = new EventEmitter();
  @Output() info:EventEmitter<any> = new EventEmitter();

  _menuItems: MenuItem[]=[];
  constructor() { }
  ngOnInit(): void {
    if(this.isEditable){
      this._menuItems = [
        {label:"Supprimer",icon:'pi pi-fw pi-trash',command:()=>{this.onDelete()}},
      ]
    }
    this._menuItems.push({label:"Information",icon:'pi pi-fw pi-info-circle',command:()=>{this.onInfo()}})
  }

  onDelete(){
    this.delete.emit(this.id);
  }

  onInfo(){
    this.info.emit(this.id);
  }
}
