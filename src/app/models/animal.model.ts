import { EntityContainer } from "./entityContainer.model";

export interface SingleAnimalAttributes{
    'categorie' : string,
    'endemicite' : string,
    'espece'  : string,
    'famille' : string,
    'genre' : string,
    'guild' : string,
    'status' : string,
    'nom_vernaculaires' : EntityContainer<NomVernaculaire>[],
    'nom_communs' : EntityContainer<NomCommun>[],
    'nom_scientifiques' : EntityContainer<NomScientifique>[],
    'notes': EntityContainer<Note>[]
}

export interface AnimalAttributes{
    'categorie' : string,
    'espece'  : string,
    'famille' : string,
    'genre' : string,
    'status' : string
    'nom_courrant':string
}

export interface NomVernaculaire{
    'nom':string,
    'animal_id':number
}

export interface NomCommun{
    'nom':string,
    'animal_id':number
}

export interface NomScientifique{
    'nom':string,
    'mis_a_jour':Date,
    'animal_id':number
}

export interface Note{
    'titre':string,
    'valeur':string
}