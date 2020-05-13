import { ShoppingCartItem } from './shoppingCart'
export class PrettyShoppingCartItem {
        firstName:string;
        productName:string;
        price:number;
        quantity:number;

        static from(obj: PrettyShoppingCartRow)
        {
            const cart = new PrettyShoppingCartItem(
                obj.first_name, obj.product_name, obj.price, obj.quantity
            );
            return cart;
        }
        constructor(firstName, productName, price, quantity)
        {
            this.firstName = firstName;
            this.productName = productName;
            this.price = price;
            this.quantity = quantity;
        }
}

export interface PrettyShoppingCartRow{
    first_name:string;
    product_name:string;
    price:number;
    quantity:number;
}