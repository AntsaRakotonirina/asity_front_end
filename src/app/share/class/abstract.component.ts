import { ConfirmationService, MenuItem } from "primeng/api";
import { Observable, tap } from "rxjs";
import { EntityContainer, PaginatedData } from "src/app/models/entityContainer.model";
import { AuthService } from "src/app/services/auth.service";
import { ComponentOperationsInterface } from "../interfaces/ComponentOperationsInterface";
import { IndexRequest } from "../interfaces/CrudInterface";
import { AbstractAPIService } from "./abstractAPI.service";

export abstract class AbstractAPIComponent<T,S> implements ComponentOperationsInterface{
    
    public _selectedIds:number[]=[];  //les identifiants des objets selectionner
    public _search:string=""          //la valeur de la bare de recherche;
    //Message afficher sur le dialog de confirmations lors de la suppression
    public _deleteMessage:string   = "Etes vous sur de vouloir supprimer cet entiter ?";
    public _isAddFormOpen:boolean  = false         //Flag qui detecte si le formulaire de création est ouvert
    public _dialItems:MenuItem[]   = [];    //Menu su le bouton + de la vue
    public _curentPage:number      = NaN;      //Page Courente si on a un systéme de pagination
    public _attributes:Attributes[]= []; //La liste des attribute pour filter
    public _selectedAttribute:Attributes|null = null //L'attribue selection actuellement
    public _defaultAttribute:Attributes|null  = null //l'attribue par defaut si le component ne  permet pas un filtrage sur plusieurs attribut (cas general)
    public _parentId:number = NaN;

    /**
     * Etat local d'un component
     * @note wrapper dans un objet pour povoir effectuer un passage par reference
     */
    public _state:ComponentState = {
        isLoading: false,
        isSearching: false
    }
    constructor(
        protected baseService:AbstractAPIService<T,S>,
        protected confirmationService:ConfirmationService,
        public authService:AuthService
    ) { }
    
    /**
     * Initialisation du button (+) de la vue
     * @note Ne pas appeler si le vue ne comporte pas ce menu
     * @note Overrider si le menu change drastiquement mais on peut aussi ajouter  un menu avec this._dialItems.push(items:MenuItem)
     */
    initDial(){
        this._dialItems = [
            {
              icon: 'pi pi-plus',
              command:()=>{this.add()}
            },
            {
              icon: 'pi pi-times',
              command:()=>{
                this.onUnSelectAll();
              }
            },
            {
              icon: 'pi pi-refresh',
              command:()=>{
                this.refresh().subscribe();
              }
            },
            {
              icon: 'pi pi-trash',
              command:()=>{
                this.confirmationService.confirm({
                    header: "Supprimer?",
                    message:"Etes vous sur de vouloir supprimer ces entité ?",
                    accept:()=>{this.onMassDelete(0);}
                  })
                  
              }
            },
          ]
    }

    /**
     * Genere la requete de recherche tout en prenant en compte la pagination et des critaire de recherche
     * @use Pour les commande refresh
     */
    generateIndexRequest():IndexRequest{
        //On vas generer une requete
        let request:IndexRequest = {}; 
        //On verifie si on a un systeme de pagination
        if(!isNaN(this._curentPage)){
            request.page = this._curentPage;
        }
        if(!isNaN(this._parentId)){
            request.parentId = this._parentId;
        }

        //On verifie si on a des attributs
        if(this._attributes.length > 0){
            request.search ={attribute:this._selectedAttribute?.nom,}
        }else{
            //sinon on utilise l'atribut par defaut
            request.search ={attribute:this._defaultAttribute?.nom}
        }

        request.search.query = this._search;
    
        return request;
    }
    /**
     * Ajout d'une nouvelle entiter
     * @note cette fonction ne fait qu'ouvir un formulaire d'ajout car la creatio d'entiter est déleger a ce formulaire
     */
    add(): void {
        this._isAddFormOpen = true;
    }

    /**
     * Rafraichie la vue courente tout en respectant la pagination et des critaire de recherche
     */
    refresh(): Observable<PaginatedData<EntityContainer<T>>> {
        this._state.isLoading = true
        return this.baseService.index(this.generateIndexRequest())
        .pipe(tap(
            {
                complete:()=>{this._state.isLoading = false}
            }
        ));
    }

    /**
     * Obtenir les donées de la premiere page
     * @note cette fonction doit etre utiliser a fin d'initialisation uniquement car elle reinitialise toute les proprieter de filtre (pagination, recherche). Utiliser plutot refresh
     */
    index(): void{
        this._curentPage = 1;
        this._search = "";
        this._selectedAttribute = this._attributes[0];
        this.refresh().subscribe();
    }

    /**
     * Simple appelle vers la fontion add
     * Destiner a etre utiliser sur les listener customiser (click de button)
     */
    onAdd(): void {
        this.add();
    }

    /**
     * Simple appelle vers la fontion refresh
     * Destiner a etre utiliser sur les listener customiser (click de button)
     */
    onRefresh(): void {
        this.refresh().subscribe();
    }

    /**
     * Permet de naviguer d'une page a l'autre
     * @event click sur un bouton de pagination
     */
    onPage(page:any): void {
        this._curentPage = page.page+1;
        this.refresh().subscribe();
    }

    /**
     * Permet d'effectuer une recherche
     * @event enter sur le formulaire de recherche
     */
    onSearch(): void {
        //on recharge la page courente
        this._curentPage =  1;
        this._state.isSearching = true;
        this.refresh().subscribe({
            complete:()=>{this._state.isSearching = false}
        });
    }
    
    /**
     * Supprimer une entiter
     * @param id Identifient de l'entiter
     */
    onDelete(id:number){
        this.baseService.destroy(id).subscribe();
    }

    /**
     * Permet de supprimer plusieur entiter de maniere recursif
     */
    onMassDelete(index:number): void {
        if(index < this._selectedIds.length){
            this.baseService.destroy(this._selectedIds[index])
            .subscribe({
              next:()=>{
                this.onMassDelete(index+1);
              },
              error:()=>{
                this.onMassDelete(index+1);
              }
            })
        }else{
            this.onUnSelectAll();
        }
    }

    /** 
    * Vide la liste de selection 
    */
    onUnSelectAll(): void {
        if(this._selectedIds.length > 0){
            this._selectedIds.splice(0);
            this.refresh().subscribe();
        }
    }
}

export interface Attributes{
    nom:string
}

export interface ComponentState{
    isLoading:boolean,
    isSearching:boolean
}