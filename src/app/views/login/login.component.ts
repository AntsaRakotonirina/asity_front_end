import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginData } from 'src/app/models/form_model/loginForm.model';
import { ErrorMessage } from 'src/app/models/message.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  _data:LoginData={
    name: '',
    password: ''
  };

  _errors: ErrorMessage={
    "message":"",
    "errors":{}
  };
  _passwordShow:boolean = false;
  _isLoading:boolean = false;
  constructor(
    private authService:AuthService,
    private router:Router
  ) { }

  ngOnInit(): void {
  }

  onLogin(){
    this.authService.login(this._data)
    .subscribe({
        next:()=>{
          this.router.navigate(['/app']);
        },
        error:(error)=>{
          this._errors=error.error;
        }
      })
  }
  onReset(){
    this._data = {
      name: '',
      password: ''
    }
  }

  isFormValid(){
    return this._data.name.length > 0 && this._data.password.length > 0
  }

}
