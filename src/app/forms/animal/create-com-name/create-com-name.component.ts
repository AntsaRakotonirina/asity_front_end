import { Component, Input, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { EntityContainer } from 'src/app/models/entityContainer.model';
import { ComNameAttributes } from 'src/app/models/name.model';
import { ComNameRequest } from 'src/app/models/requests/animalRequest.model';
import { AnimalService } from 'src/app/services/animal.service';
import { NameService } from 'src/app/services/name.service';
import { CreateNameComponent } from '../abstract-create-name.component';

@Component({
  selector: 'app-create-com-name',
  templateUrl: './create-com-name.component.html',
  styleUrls: ['../create-name.component.css','./create-com-name.component.css']
})
export class CreateComNameComponent extends CreateNameComponent<ComNameAttributes,ComNameRequest> implements OnInit {
  @Input() nameList:EntityContainer<ComNameAttributes>[]|null=[];
  @Input() animalId:number=-1;
  override nameType:string='communs';

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

  onCreate(request: ComNameRequest): void {
    this.animalService.addCommname(request,this._animalId).subscribe({
      next:(response)=>{
        this._nameList?.push(response.data);
      }
    })
  }
}
