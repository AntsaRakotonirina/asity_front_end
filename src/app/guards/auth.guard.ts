import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';
import { myEnv } from 'src/environments/myEnv';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService:AuthService,private router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    let token = localStorage.getItem(myEnv.tokenKey);
    if(token === null){
      this.router.navigate(['login']);
      return false;
    }
    //si on est authentifier on charge les donnée utilisateur
    return this.authService.user_obs.pipe(map((user)=> true ));
  }
  
}
