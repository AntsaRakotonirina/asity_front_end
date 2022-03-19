import { Observable } from "rxjs";

export interface RestInterface{
    index  ():Observable<unknown>,
    store  (payload:unknown):Observable<unknown>,
    update (data:unknown,id:number):Observable<unknown>,
    show   (id:number):Observable<unknown>,
    destroy(id:number):Observable<unknown>,
}