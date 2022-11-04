export interface BasketModel{
    items?:BasketItemModel[];
    note?:string;
}

export interface BasketItemModel{
    catalogId:number;
    quantity:number;
    unitprice:number;
}