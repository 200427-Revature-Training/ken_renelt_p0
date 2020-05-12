import { db } from '../daos/db';
import {ShoppingCartItem, ShoppingCartRow} from '../data-models/shoppingCart';

export function getShoppingCart(): Promise<ShoppingCartItem[]> {
    const sql = 'SELECT * FROM shopping_cart';

    return db.query<ShoppingCartRow>(sql, []).then(result => {
        const rows:ShoppingCartRow[] = result.rows;

        const allItems:ShoppingCartItem[] = rows.map(row => ShoppingCartItem.from(row));
        console.log(rows);
        return allItems;
    });
}

// update -- change your order add or subtract items from your cart
export function updateShoppingCart(cart: ShoppingCartItem): Promise<ShoppingCartItem> {
   // sql statement
    const sql = 'UPDATE shopping_cart SET owner_id = COALESCE($1, owner_id), \
     product_id = COALESCE($2, product_id) \
     quantitiy = COALESCE($3, quantity) \
     WHERE id = $4 RETURNING *';
   // db query
   return db.query<ShoppingCartRow>(sql, [
       cart.ownerId,
       cart.productId,
       cart.quantity,
       cart.id
   ]).then(result => result.rows.map(r => ShoppingCartItem.from(r))[0]);
}

// create does it make sense here?
export function createShoppingCart(cart: ShoppingCartItem): Promise<ShoppingCartItem> {
    const sql = 'INSERT INTO shopping_cart (owner_id, product_id, quantity) \
    VALUES ($1, $2, $3) RETURNING *';

    return db.query(sql, [
        cart.ownerId,
        cart.productId,
        cart.quantity
    ]).then(result => result.rows.map(row => ShoppingCartItem.from(row))[0]);
}

// delete -- remove items from your cart
export function deleteShoppingCart(cart: ShoppingCartItem): Promise<ShoppingCartItem> {
    console.log('shopping cart dao' + cart.id);
 const sql = 'DELETE FROM shopping_cart WHERE id = $1';

 return db.query<ShoppingCartRow>(sql,[cart.id])
    .then(result => result.rows.map(r => ShoppingCartItem.from(r))[0]);
}