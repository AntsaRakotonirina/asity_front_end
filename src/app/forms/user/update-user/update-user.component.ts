import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['../../form.component.css','./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {
  _data!:any;
  _passwordShow:boolean = false;
  _adminOptions:any[]=[{label:'Normal',value:false},{label:'Admin',value:true}];

  constructor(
    private userService:UserService,
    private ref:DynamicDialogRef,
    private config:DynamicDialogConfig
  ) { }

  get formValid(){
    return this._data.name.length > 0 && 
    this._data.password.length > 0 &&
    this._data.password_confirmation.length > 0 && 
    this._data.password_confirmation === this._data.password;
  }

  ngOnInit(): void {
    this._data = {...this.config.data.user.attributes,password:''};
  }

  onSubmit(){}
  onReset(){}
}
