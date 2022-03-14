import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { myEnv } from 'src/environments/myEnv';
import { Router } from '@angular/router';

@Injectable()
export class LoginInterceptor implements HttpInterceptor {

  constructor(private router:Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem(myEnv.tokenKey);

    //allez
    if(token){
      request = request.clone({
        setHeaders:{Authorization:'Bearer '+token}
      })
    }

    //retour
    return next.handle(request).pipe(
      //En cas d'erreur de la part du serveur
      catchError((err)=>{
        if(err instanceof HttpErrorResponse){
          //On verifie si l'erreur est une "erreur d'access"
          if(err.status === 401 && err.statusText === "Unauthorized"){
            //On deconecte manuellement notre utilisateur car le token est perimer
            localStorage.removeItem(myEnv.tokenKey);
            this.router.navigate(['/login']);
          }
        }
        return throwError(()=>err);
      })
    );
  }
}
