export interface ParentAttributes{
    pays:string,
    aireProteger:string,
    abreviation:string,
    latitude:number,
    longitude:number
}

export interface RegionAttributes{
    nom:string,
    site_parent_id:number
}

export interface SiteAttributes{
    nom:string,
    region_id:number,
    latitude:number,
    longitude:number
}