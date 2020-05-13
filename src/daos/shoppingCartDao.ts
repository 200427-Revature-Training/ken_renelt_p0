import { db } from '../daos/db';
import {ShoppingCartItem, ShoppingCartRow} from '../data-models/shoppingCart';
import { PrettyShoppingCartRow, PrettyShoppingCartItem } from '../data-models/PrettyShoppingCart';

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

export function getAllCartsForUser(id: number): Promise<PrettyShoppingCartItem[]> {

    const sql = 'SELECT * FROM shopping_cart WHERE owner_id = $1';

    // This is not working as it does in d beaver. it shows correctly in the console log
   const sql1 = 'SELECT users.first_name, items.product_name, items.price, shopping_cart.quantity \
   FROM shopping_cart LEFT JOIN items ON shopping_cart.product_id = items.id \
   LEFT JOIN users ON users.id = shopping_cart.owner_id WHERE users.id = $1';

   return db.query<PrettyShoppingCartRow>(sql1, [id])
        .then(result => {
            const rows:PrettyShoppingCartRow[] = result.rows;

            const allItems:PrettyShoppingCartItem[] = rows.map(row => PrettyShoppingCartItem.from(row));
            console.log(rows);
            return allItems;
        });
}