import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { EntityContainer } from 'src/app/models/entityContainer.model';
import { ParentAttributes } from 'src/app/models/localisation.model';

@Component({
  selector: 'app-parent-info',
  templateUrl: './parent-info.component.html',
  styleUrls: ['./parent-info.component.css']
})
export class ParentInfoComponent implements OnInit {
  _parent!:EntityContainer<ParentAttributes>

  constructor(
    private ref:DynamicDialogRef,
    private config:DynamicDialogConfig
  ) { }

  ngOnInit(): void {
    this._parent = this.config.data.parent;
    if(!this._parent){
      this.ref.close();
    }
  }
}
