import { EntityContainer } from "./entityContainer.model";
import { NoteAttributes } from "./note.model";

export interface ObservationAttributes{
    animal:string,
    habitat:string,
    longitude:number,
    latitude:number,
    abondance:number,
    presence:boolean,
    zone:string,
    notes:{data:EntityContainer<NoteAttributes>[]},
    animal_id:number,
    suivi_id:number,
    nombre:number,
    date:Date,
}