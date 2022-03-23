import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { map, Observable } from 'rxjs';
import { SingleAnimalComponent } from '../views/animal/single-animal/single-animal.component';

@Injectable({
  providedIn: 'root'
})
export class AnimalUpdateGuard implements CanDeactivate<unknown> {
  constructor(
    protected confirmationService:ConfirmationService
  ) { }
  canDeactivate(
    component: SingleAnimalComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    let response:Promise<boolean> = new Promise((resolve,reject)=>{
      if(component.isAttributesChanged){
        this.confirmationService.confirm({
          header:"Abandoner les modification?",
          message: "Vos modification n'ont pas encore été sauvegarder, si vous quitter maintenan elles risques d'etre perdue",
          acceptLabel: "Annuler",
          icon:"pi pi-exclamation-triangle",
          rejectLabel: "Continuer",
          accept:()=>{resolve(false)},
          reject:()=>{resolve(true)}
        })
      }else{
        resolve(true);
      }
    });
    
    return response;
  }

}
