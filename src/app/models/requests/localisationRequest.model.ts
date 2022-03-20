export interface ParentRequest{
    aireProteger:string,
    pays:string,
    abreviation:string,
    latitude:number,
    longitude:number
}

export interface RegionRequest{
    nom:string,
    site_parent_id:number
}

export interface SiteRequest{
    nom:string,
    region_id:number,
    latitude:number,
    longitude:number
}