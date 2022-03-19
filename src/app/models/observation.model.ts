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
    notes:EntityContainer<NoteAttributes>[],
    animal_id:number,
    suivi_id:number,
    site_parent_id:number,
    nombre:number,
}