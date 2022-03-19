import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, map, of, tap } from 'rxjs';
import { myEnv } from 'src/environments/myEnv';
import { EntityContainer } from '../models/entityContainer.model';
import { LoginData } from '../models/form_model/loginForm.model';
import { DataMessage, LoginMessage, MessageModel } from '../models/message.model';
import { UserAttributes } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user!:EntityContainer<UserAttributes>|undefined;

  get user_obs(){
    if(this.user === undefined){
      return this.http.get<DataMessage<EntityContainer<UserAttributes>>>(myEnv.urls.check)
      .pipe(map((reponse)=>{
        this.user = reponse.data;
        return reponse.data;
      }));
    }
    return of(this.user);
  }

  /**
   * Savoir si l'utilisateur courant est  un administrateur
   * Necesite d'avoir un utilisateur déja charger
   */
  get userIsAdmin(){
    return this.user?.attributes.isAdmin;
  }

  constructor(private http:HttpClient) {
    this.init;
  }

  private init(){
    const token = localStorage.getItem(myEnv.tokenKey);
    if(token){
      const user = this.user_obs;
    }
  }

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
        next:(response)=>{
          this.addToken(response.token);
          this.user = response.user;
        },
        error:()=>{},
        complete:()=>{},
      })
    );
  }
  
  public logout(){
    return this.http.get<MessageModel>(myEnv.urls.logout)
    .pipe(
      tap({
        next:()=>{
          this.user = undefined;
          this.removeToken();
        },
        error:()=>{},
        complete:()=>{},
      })
    );
  }
}
