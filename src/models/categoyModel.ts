export interface CatalogModel{
    id?:number;
    name?:string;
    description?:string;
    pictureUrl:string;
    thumbUrl:string;
}

export interface CategoryModel{
    id?:number;
    name?:string;
    status?:number
}