import { Component, Input, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { EntityContainer } from 'src/app/models/entityContainer.model';
import { VerNameAttributes } from 'src/app/models/name.model';
import { VernameRequest } from 'src/app/models/requests/animalRequest.model';
import { AnimalService } from 'src/app/services/animal.service';
import { NameService } from 'src/app/services/name.service';
import { CreateNameComponent } from '../abstract-create-name.component';

@Component({
  selector: 'app-create-ver-name',
  templateUrl: './create-ver-name.component.html',
  styleUrls: ['../create-name.component.css','./create-ver-name.component.css']
})
export class CreateVerNameComponent extends CreateNameComponent<VerNameAttributes,VernameRequest> implements OnInit {
  @Input() nameList:EntityContainer<VerNameAttributes>[]|null=[];
  @Input() animalId:number=-1;
  override nameType:string='vernaculaires';

  constructor(
    protected override animalService:AnimalService,
    protected override nameService:NameService,
    protected override confirmationService:ConfirmationService) {
      super(animalService,nameService,confirmationService);
  }

  ngOnInit(): void {
    this._animalId = this.animalId;
    this._nameList = this.nameList;
  }


  onCreate(request:VernameRequest){
    this.animalService.addVername(request,this._animalId).subscribe({
      next:(response)=>{
          this._nameList?.push(response.data);
      }
    })
  }
}
