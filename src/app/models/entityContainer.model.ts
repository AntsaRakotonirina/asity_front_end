export interface EntityContainer<T>{
    "id":number,
    "type":string,
    "attributes":T
}

export interface PaginatedData<T>{
    'data':T[],
    "links": {
        "first": string|null,
        "last": string|null,
        "prev": string|null,
        "next": string|null
    },
    "meta": {
        "current_page": number|null,
        "from": number|null,
        "last_page": number,
        "links": 
            {
                "url": string|null,
                "label": string ,
                "active": boolean
            }[],
        "path": string|null,
        "per_page": number,
        "to": string|null,
        "total": number
    }
}