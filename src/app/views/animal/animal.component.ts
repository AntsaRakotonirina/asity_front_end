import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { AnimalAttributes, SingleAnimalAttributes } from 'src/app/models/animal.model';
import { EntityContainer } from 'src/app/models/entityContainer.model';
import { AnimalService } from 'src/app/services/animal.service';
import { AuthService } from 'src/app/services/auth.service';
import { AbstractAPIComponent, Attributes } from 'src/app/share/class/abstract.component';

@Component({
  selector: 'app-animal',
  templateUrl: './animal.component.html',
  styleUrls: ['./animal.component.css']
})
export class AnimalComponent extends AbstractAPIComponent<AnimalAttributes,SingleAnimalAttributes> implements OnInit {

  override _attributes:Attributes[]=[
    {nom:'nom'},
    {nom:'categorie'},
    {nom:'endemicite'},
    {nom:'espece'},
    {nom:'famille'},
    {nom:'genre'},
    {nom:'guild'},
    {nom:'status'}
  ];

  override _selectedAttribute:Attributes={
    nom:'nom'
  }
  get animals(){
    return this.animalService.animals;
  }

  constructor(
    protected animalService:AnimalService,
    protected override confirmationService:ConfirmationService,
    public override authService:AuthService,
    private router:Router
  ) {
    super(animalService,confirmationService,authService);
  }


  ngOnInit(): void {
    this.index();
    this.initDial();
  }

  onInfo(animal:EntityContainer<AnimalAttributes>){
    this.router.navigateByUrl(`/app/animal/${animal.id}`)
  }

}

