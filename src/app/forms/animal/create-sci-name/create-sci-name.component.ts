import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { EntityContainer } from 'src/app/models/entityContainer.model';
import { SciNameAttributes } from 'src/app/models/name.model';
import { SciNameSequest } from 'src/app/models/requests/animalRequest.model';
import { AnimalService } from 'src/app/services/animal.service';
import { NameService } from 'src/app/services/name.service';
import { CreateNameComponent } from '../abstract-create-name.component';

@Component({
  selector: 'app-create-sci-name',
  templateUrl: './create-sci-name.component.html',
  styleUrls: ['./create-sci-name.component.css']
})
export class CreateSciNameComponent extends CreateNameComponent<SciNameAttributes,SciNameSequest> implements OnInit {
  @Input() nameList:EntityContainer<SciNameAttributes>[]|null=[];
  @Input() animalId:number=-1;
  @Input() curentId:number=0;
  @Output() changeCurentName:EventEmitter<number> = new EventEmitter<number>()
  newDate:Date = new Date();
  override nameType:string='scientifiques';
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

  onCreate(request: SciNameSequest): void {
    this.animalService.addSciname(request,this._animalId).subscribe({
      next:(response)=>{
          this._nameList?.push(response.data);
      }
    })
  }

  onChange(){
    this.changeCurentName.emit(this.curentId);
  }
}
