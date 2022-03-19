import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { CreateUserComponent } from 'src/app/forms/user/create-user/create-user.component';
import { EntityContainer } from 'src/app/models/entityContainer.model';
import { UserAttributes } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { AbstractComponent } from '../../abstractView.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent extends AbstractComponent<UserAttributes> implements OnInit {

  constructor(
    public userService:UserService,
    protected override confirmationService:ConfirmationService,
    public override authService:AuthService,
    public dialogService:DialogService
  ) {
    super(userService,confirmationService,authService);
  }

  get users(){
    return this.userService.users;
  }

  get myUser(){
    return this.authService.user;
  }

  ngOnInit(): void {
    this.search();
    this._dialItems = [
      {
        icon: 'pi pi-plus',
        command:()=>{
          this.dialogService.open(CreateUserComponent,{
            header:"Ajout d'un utilisateur"
          })
        }
      },
      {
        icon: 'pi pi-refresh',
        command:()=>{
          this.search()
        }
      }
    ]
  }
  changeAdmin(user:EntityContainer<UserAttributes>){
    this.userService.update(user.attributes,user.id)
    .subscribe();
  }
}
