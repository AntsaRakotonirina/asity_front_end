import { HttpClient } from "@angular/common/http";
import { MessageService } from "primeng/api";
import { map, Observable, tap } from "rxjs";
import { EntityContainer, PaginatedData, SingleEntityContainer } from "src/app/models/entityContainer.model";
import { DataMessage, MessageModel } from "src/app/models/message.model";
import { myEnv } from "src/environments/myEnv";
import { CrudInterface, IndexRequest, StoreRequest, UpdateRequest } from "../interfaces/CrudInterface";

export abstract class AbstractAPIService<T,S> implements CrudInterface{
    _data:PaginatedData<EntityContainer<T>>|null=null;
    slug:string = '';
    baseURL:string=myEnv.urls.base;
    parentURL:string|null=null;
    protected type:string="Entiter";

    constructor(
        protected http:HttpClient,
        protected messageService:MessageService
    ){}

    responseHandler(operationType:'create'|'delete'|'update'){
        let operation:string = ""
        switch (operationType) {
            case "create":
                operation = "création"
                break;
            case "delete":
                operation = "suppression"
                break;
            case "update":
                operation = "mis a jour"
                break;
            default:
                break;
        }
        return {
            next:()=>{this.messageService.add({severity:'success',summary:`${operation} effectuer !`})},
            error:()=>{this.messageService.add({severity:'error',summary:`Erreur de ${operation}`,detail:`Impossible de faire une ${operation} de ${this.type} veuillez réessayer ultérieurement ou rechargez la page`})}
        }
    }

    generateUrl(request:IndexRequest){
        let response = "";
        if(this.parentURL && request.parentId){
            response = `${this.parentURL}/${request.parentId}/${this.slug}?`
        }else{
            response = `${this.baseURL}?`
        }
        
        if(request.page){
            response += `page=${request.page}&`
        }
        if(request.search){
            if(request.search.attribute){
                response += `attribute=${request.search.attribute}&`
            }
            if(request.search.query){
                response += `query=${request.search.query}`
            }
        }

        return response;
    }

    store(request: StoreRequest): Observable<DataMessage<EntityContainer<T>>> {
        return this.http.post<DataMessage<EntityContainer<T>>>(this.baseURL,request.data)
        .pipe(
            tap(this.responseHandler('create')),
            map((reponse)=>{
                this._data?.data.push(reponse.data)
                return reponse;
            })
        )
    }

    index(request: IndexRequest): Observable<PaginatedData<EntityContainer<T>>> {
    return this.http.get<PaginatedData<EntityContainer<T>>>(this.generateUrl(request))
        .pipe(map((reponse)=>{
            this._data = reponse;
            return reponse;
        }));
    }

    update(request: UpdateRequest): Observable<DataMessage<EntityContainer<T>>> {
        return this.http.put<DataMessage<EntityContainer<T>>>(`${this.baseURL}/${request.id}`,request.data)
        .pipe(
            tap(this.responseHandler('update')),
            map((reponse)=>{
                const index = this._data?.data.findIndex((value)=>value.id === request.id)
                console.log(index !== undefined && index >= 0 && this._data !== null);
                if(index !== undefined && index >= 0 && this._data){
                    this._data.data[index]=reponse.data;
                }
                return reponse;
            })
        );
    }
    
    destroy(id: number): Observable<MessageModel> {
        return this.http.delete<MessageModel>(`${this.baseURL}/${id}`)
        .pipe(
            tap(this.responseHandler('delete')),
            map((reponse)=>{
                const index = this._data?.data.findIndex((value)=>value.id === id)
                if(index !== undefined && index >= 0 && this._data !== null){
                    this._data.data.splice(index,1);
                }
                return reponse;
            })
        );;
    }

    show(id: number): Observable<SingleEntityContainer<S>> {
        return this.http.get<SingleEntityContainer<S>>(`${this.baseURL}/${id}`);
    }
}