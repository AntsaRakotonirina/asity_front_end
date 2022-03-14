import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginData } from 'src/app/models/form_model/loginForm.model';
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

  passwordShown:boolean=false;

  constructor(
    private authService:AuthService,
    private router:Router
  ) { }

  ngOnInit(): void {
  }

  onLogin(){
    this.authService.login(this._data)
    .subscribe(
      ()=>{
        this.router.navigate(['/app']);
      }
    )
  }
  onReset(){
    this._data = {
      name: '',
      password: ''
    }
  }

}
