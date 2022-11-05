export interface CartModel{
    items?:CartItemModel[];
    note?:string;
}

export interface CartItemModel{
    id:number;
    name:string;
    catalogId:number;
    quantity:number;
    unitprice:number;
}