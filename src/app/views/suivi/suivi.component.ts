import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { EntityContainer } from 'src/app/models/entityContainer.model';
import { SuiviAttributes, SuiviSingleAttributes } from 'src/app/models/suivi.model';
import { AuthService } from 'src/app/services/auth.service';
import { DateIndexRequest, SuiviService } from 'src/app/services/suivi.service';
import { AbstractAPIComponent } from 'src/app/share/class/abstract.component';

@Component({
  selector: 'app-suivi',
  templateUrl: './suivi.component.html',
  styleUrls: ['./suivi.component.css']
})
export class SuiviComponent extends AbstractAPIComponent<SuiviAttributes,SuiviSingleAttributes> implements OnInit{

  _filterDates:{from:Date,to:Date}={
    from: new Date('1970-1-1'),
    to: new Date()
  }

  constructor(
    protected suiviService:SuiviService,
    protected override confirmationService:ConfirmationService,
    public override authService:AuthService,
    private router:Router
  ) {
    super(suiviService,confirmationService,authService);
  }

  ngOnInit(): void {
    this.index();
    this.initDial();
  }

  get suivis(){
    return this.suiviService.suivis;
  }

  /**
     * Genere la requete de recherche tout en prenant en compte la pagination et des critaire de recherche
     * @use Pour les commande refresh
     */
  override generateIndexRequest():DateIndexRequest{
    //On vas generer une requete
    let request:DateIndexRequest = {}; 
    //On verifie si on a un systeme de pagination
    if(!isNaN(this._curentPage)){
        request.page = this._curentPage;
    }

    request.date = this._filterDates;

    return request;
  }

  onInfo(suivi:EntityContainer<SuiviAttributes>){
    this.router.navigate([`/app/suivi/${suivi.id}`]);
  }
}
