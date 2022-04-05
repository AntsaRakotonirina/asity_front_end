import { AnimalAttributes } from "./animal.model";
import { EntityContainer, PaginatedData } from "./entityContainer.model";
import { LocalisationAttributes } from "./local.model";
import { SiteAttributes } from "./localisation.model";
import { NoteAttributes } from "./note.model";
import { ObservationAttributes } from "./observation.model";
import { ParticipationAttributes } from "./participations.model";
import { ScientifiqueAttributes } from "./scientifique.model";

export interface SuiviAttributes{
    default_date:Date
    first_localisation: EntityContainer<LocalisationAttributes>
}

export interface SuiviSingleAttributes{
    default_date:Date,
    notes:{data:EntityContainer<NoteAttributes>[]},
    localisations:EntityContainer<LocalisationAttributes>[],
    observations:EntityContainer<ObservationAttributes>[],
    participations:EntityContainer<ParticipationAttributes>[],
}