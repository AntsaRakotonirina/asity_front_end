import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { myEnv } from 'src/environments/myEnv';
import { LoginData } from '../models/form_model/loginForm.model';
import { LoginMessage, MessageModel } from '../models/message.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  public addToken(token:string){
    localStorage.setItem(myEnv.tokenKey,token);
  }

  public removeToken(){
    localStorage.removeItem(myEnv.tokenKey);
  }

  public login(creds:LoginData){
    return this.http.post<LoginMessage>(myEnv.urls.login,creds)
    .pipe(
      tap({
        next:(response)=>{this.addToken(response.token)},
        error:()=>{},
        complete:()=>{},
      })
    );
  }
  
  public logout(){
    return this.http.get<MessageModel>(myEnv.urls.logout)
    .pipe(
      tap({
        next:()=>{this.removeToken();},
        error:()=>{},
        complete:()=>{},
      })
    );
  }
}
