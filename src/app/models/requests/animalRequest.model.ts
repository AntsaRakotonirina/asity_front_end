export interface animalAddRequest{
    'categorie' : string,
    'endemicite' : string,
    'espece'  : string,
    'famille' : string,
    'genre' : string,
    'guild' : string,
    'status' : string,
    'count_type':"nombre"|"abondance"|"presence"
}

export interface animalUpdateRequest extends animalAddRequest{
    'curent_name_id':number
}

export interface VernameRequest{
    'nom':string
}

export interface ComNameRequest{
    'nom':string
}

export interface SciNameSequest{
    'nom':string,
    'mis_a_jour':Date
}