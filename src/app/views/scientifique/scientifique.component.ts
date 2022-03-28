import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { UpdateScientifiqueFormComponent } from 'src/app/forms/scientifique/update-scientifique-form/update-scientifique-form.component';
import { UploadComponent } from 'src/app/forms/upload-component/upload-component.component';
import { EntityContainer } from 'src/app/models/entityContainer.model';
import { ScientifiqueAttributes } from 'src/app/models/scientifique.model';
import { AuthService } from 'src/app/services/auth.service';
import { ScientifiqueService } from 'src/app/services/scientifique.service';
import { AbstractAPIComponent, Attributes } from 'src/app/share/class/abstract.component';
import { myEnv } from 'src/environments/myEnv';

@Component({
  selector: 'app-scientifique',
  templateUrl: './scientifique.component.html',
  styleUrls: ['./scientifique.component.css']
})
export class ScientifiqueComponent extends AbstractAPIComponent<ScientifiqueAttributes,ScientifiqueAttributes> implements OnInit {

  /**
   * @note le controller scientifique en back-end effectue systematiquement ses recherches par le nom et le prenom
   * la presence du parametre attribut est donc obselette mais nesesaire pour le bon fonctionement du component
   */
  public override _defaultAttribute:Attributes={nom:'nom'};

  constructor(
    protected scientifiqueService:ScientifiqueService,
    protected override confirmationService:ConfirmationService,
    public override authService:AuthService,
    private dialogService:DialogService
  ) {
    super(scientifiqueService,confirmationService,authService);
  }

  get scientifiques(){
    return this.scientifiqueService.scientifiques;
  }

  ngOnInit(): void {
    this.index();
    this.initDial();
    this._dialItems.push(
      {
        icon: 'pi pi-upload',
        command:()=>{
          this.dialogService.open(UploadComponent,{
            header:"Charger les scientifiques",
            data:{url:myEnv.urls.scientifique+'/file'}
          })
        }
      }
    )
  }

  onUpdate(scientifique:EntityContainer<ScientifiqueAttributes>){
    this.dialogService.open(UpdateScientifiqueFormComponent,{
      header:"Metre a jour "+scientifique.attributes.nom+" "+scientifique.attributes.prenom,
      data:{scientifique:scientifique}
    })
  }
}
