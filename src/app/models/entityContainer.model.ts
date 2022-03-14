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
        "current_page": string|null,
        "from": string|null,
        "last_page": string|null,
        "links": 
            {
                "url": string|null,
                "label": string ,
                "active": boolean
            }[],
        "path": string|null,
        "per_page": number|null,
        "to": string|null,
        "total": string|null
    }
}