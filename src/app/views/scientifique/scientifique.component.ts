import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { CreateScientifiqueFormComponent } from 'src/app/forms/scientifique/create-scientifique-form/create-scientifique-form.component';
import { UpdateScientifiqueFormComponent } from 'src/app/forms/scientifique/update-scientifique-form/update-scientifique-form.component';
import { UploadComponent } from 'src/app/forms/upload-component/upload-component.component';
import { EntityContainer } from 'src/app/models/entityContainer.model';
import { ScientifiqueAttributes } from 'src/app/models/scientifique.model';
import { AuthService } from 'src/app/services/auth.service';
import { ScientifiqueService } from 'src/app/services/scientifique.service';
import { myEnv } from 'src/environments/myEnv';
import { AbstractComponent } from '../abstractView.component';

@Component({
  selector: 'app-scientifique',
  templateUrl: './scientifique.component.html',
  styleUrls: ['./scientifique.component.css']
})
export class ScientifiqueComponent extends AbstractComponent<ScientifiqueAttributes> implements OnInit {

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
    this.search();
    this._dialItems = [
      {
        icon: 'pi pi-plus',
        command:()=>{
          this.dialogService.open(CreateScientifiqueFormComponent,{
            header:"Ajout d'un nouveau scientifique"
          })
        }
      },
      
      {
        icon: 'pi pi-times',
        command:()=>{
          if(this._selectedIds.length > 0){this._selectedIds.splice(0);this.search()}
        }
      },
      {
        icon: 'pi pi-upload',
        command:()=>{
          this.dialogService.open(UploadComponent,{
            header:"Charger les scientifiques",
            data:{url:myEnv.urls.scientifique+'/file'}
          })
        }
      },
      {
        icon: 'pi pi-refresh',
        command:()=>{
          this.search()
        }
      },
      {
        icon: 'pi pi-trash',
        command:()=>{
          this.confirmationService.confirm({
            header:"Suppresion",
            message: "Voulez vous vraiment retirer ces scientifiques?",
            acceptLabel: "Supprimer",
            icon:"pi pi-exclamation-triangle",
            accept:()=>{
              this.massDelete(0);
            }
          })
        }
      },
    ]
  }

  override onDelete(scientifique:EntityContainer<ScientifiqueAttributes>){
    this._deleteMessage = "Etes vous sur de vouloir retirer "+scientifique.attributes.nom+" "+scientifique.attributes.prenom+" ?";
    super.onDelete(scientifique);
  }

  onUpdate(scientifique:EntityContainer<ScientifiqueAttributes>){
    this.dialogService.open(UpdateScientifiqueFormComponent,{
      header:"Metre a jour "+scientifique.attributes.nom+" "+scientifique.attributes.prenom,
      data:{scientifique:scientifique}
    })
  }
}
