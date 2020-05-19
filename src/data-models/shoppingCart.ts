import { Item } from "./Item";

export class ShoppingCartItem {
    id:number;
    ownerId:number;
    productId:number;
    quantity:number;

    static from(obj: ShoppingCartRow)
    {
        const cart = new ShoppingCartItem(
            obj.id, obj.owner_id, obj.product_id, obj.quantity
        );
        return cart;
    }

    constructor(id, ownerId, productId, quantity)
    {
        this.id = id;
        this.ownerId = ownerId;
        this.productId = productId;
        this.quantity = quantity;
    }
}

export interface ShoppingCartRow{
    id:number;
    owner_id:number;
    product_id:number;
    quantity:number;
}