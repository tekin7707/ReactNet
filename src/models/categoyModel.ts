export interface CatalogModel{
    id?:number;
    categoryId?:number;
    price?:number;
    name?:string;
    description?:string;
    picture?:string;
    pictureUrl?:string;
    thumbUrl?:string;
    userId?:string;
    PhotoFormFile?:File;

}

export interface CategoryModel{
    id?:number;
    name?:string;
    status?:number
}