import { Item } from '../data-models/Item';
import * as itemDao from '../daos/itemDao';
import * as cartDao from '../daos/shoppingCartDao';
import { ShoppingCartItem } from '../data-models/ShoppingCart';


// crud create read update delete

// read
export function getAllItems(): Promise<Item[]> {
    return itemDao.getAllItems();
}

// read
export function getSelectItem(id:number): Promise<Item> {
    return itemDao.getSelectItem(id);
}

// create
export function createItem(item:Item): Promise<Item> {
    return itemDao.createItem(item);
}

// update
export function patchItem(item:Item): Promise<Item> {
    return itemDao.patchItem(item);
}

// delete
export function deleteItem(item:Item): Promise<Item> {
    return itemDao.deleteItem(item);
}

 export function addItemToCart(cartItem: ShoppingCartItem): Promise<ShoppingCartItem>
 {
     return itemDao.purshaceItem(cartItem);
 }