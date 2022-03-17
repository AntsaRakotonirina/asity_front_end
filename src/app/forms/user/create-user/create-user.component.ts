import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { UserFormData } from 'src/app/models/form_model/userForm.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['../../form.component.css','./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  _passwordShow:boolean = false;
  _data:UserFormData = {
    name: '',
    isAdmin: false,
    password: '',
    password_confirmation: ''
  }
  _adminOptions:any[]=[{label:'Normal',value:false},{label:'Admin',value:true}];

  get formValid(){
    return this._data.name.length > 0 && 
    this._data.password.length > 0 &&
    this._data.password_confirmation.length > 0 && 
    this._data.password_confirmation === this._data.password;
  }
  constructor(
    private userService:UserService,
    private ref:DynamicDialogRef
  ) { }

  ngOnInit(): void {
  }

  onSubmit(){
    this.userService.store(this._data)
    .subscribe({
      next: ()=>{
        this.ref.close()
      }
    });
  }
  onReset(){}
}
