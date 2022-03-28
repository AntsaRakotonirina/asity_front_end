import { Observable } from "rxjs";

/**
 *  Interface qui permet de faire les operation standard de crud
 */
export interface CrudInterface{
    store(request:StoreRequest)  :Observable<unknown>|Promise<unknown>;
    index(request:IndexRequest)  :Observable<unknown>|Promise<unknown>;
    update(request:UpdateRequest):Observable<unknown>|Promise<unknown>;
    destroy(id:number)           :Observable<unknown>|Promise<unknown>;
    show(id:number)              :Observable<unknown>|Promise<unknown>;
}

/**
 * Requette qui permet de preparer une url de recherche
 */
export interface IndexRequest{
    page?:number,
    parentId?:number,
    search?:{attribute?:string,query?:string}
}

/**
 * Requette qui permet d'envoyer une donée
 */
export interface StoreRequest{
    data:any,
    parentId?:number
}

/**
 * Requette qui permet de metre a jour
 */
export interface UpdateRequest{
    id:number,
    data:any,
    parentId?:number
}