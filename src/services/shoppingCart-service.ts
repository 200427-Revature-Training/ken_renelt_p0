import { ShoppingCartItem } from '../data-models/ShoppingCart';
import * as cartDao from '../daos/shoppingCartDao';
import { PrettyShoppingCartItem } from '../data-models/PrettyShoppingCart';

// read
export function getShoppingCart(): Promise<ShoppingCartItem[]> {
    return cartDao.getShoppingCart();
}

// update -- change your order add or subtract items from your cart
// export function updateShoppingCart(cart: ShoppingCartItem): Promise<ShoppingCartItem> {
//    return cartDao.updateShoppingCart(cart);
// }

// create doesnt make sense here

// delete -- remove items from your cart
export function deleteShoppingCart(item: ShoppingCartItem): Promise<ShoppingCartItem> {
    return cartDao.deleteShoppingCart(item);
}

export function createShoppingCart(item: ShoppingCartItem): Promise<ShoppingCartItem> {

    console.log('You are calling the shoppingCart-service');
    if(item.ownerId && item.productId)
      {
          return cartDao.createShoppingCart(item);
      }
      else
      {
         // console.warn('User invalid');
          return new Promise((resolve, reject) => reject(422));
      }
}

export function getAllCartsForUser(id:number): Promise<PrettyShoppingCartItem[]> {
    return cartDao.getAllCartsForUser(id);
}
