export interface ComponentOperationsInterface extends ComponentEventsInterface{
    add():void;
    refresh():void;
    index():void;
}

export interface ComponentEventsInterface{
    onAdd():void;
    onRefresh():void;
    onPage(page:unknown):void;
    onSearch():void;
    onMassDelete(index:number):void;
    onUnSelectAll():void; 
}