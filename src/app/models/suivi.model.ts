import { AnimalAttributes } from "./animal.model";
import { EntityContainer, PaginatedData } from "./entityContainer.model";
import { SiteAttributes } from "./localisation.model";
import { NoteAttributes } from "./note.model";
import { ScientifiqueAttributes } from "./scientifique.model";

export interface SuiviAttributes{
    default_date:Date
}

export interface SuiviSingleAttributes{
    default_date:Date,
    notes:PaginatedData<EntityContainer<NoteAttributes>>,
    localisation:PaginatedData<EntityContainer<SiteAttributes>>,
    observation:PaginatedData<EntityContainer<AnimalAttributes>>,
    participation:PaginatedData<EntityContainer<ScientifiqueAttributes>>,
}