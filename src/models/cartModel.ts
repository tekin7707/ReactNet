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
    thumbUrl?:string;

}


export interface CheckoutUserModel {
    name?: string;
    surname?: string;
    city?: string;
    country?: string;
    address?: string;
    phone?: string;
    email?: string;
  }