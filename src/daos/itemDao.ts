

import {db } from '../daos/db';
import {Item, ItemRow } from '../data-models/Item';

/**
 * itemDao - functions to return items specified by the user
 * getAllItems
 * read - getSelectedItem
 * create - createItem
 * update patchItem change entries
 * delete - deleteItem  remove entries
 */

// retrieve a list of all items for sale
export function getAllItems(): Promise<Item[]>{
    const sql = 'SELECT * FROM items';

    return db.query<ItemRow>(sql, []).then(result => {
        const rows:ItemRow[] = result.rows;

        const allItems:Item[] = rows.map(row => Item.from(row));
        console.log(rows);
        return allItems;
    });
}
// retrieve a single item that they selected
export function getSelectItem(id:number): Promise<Item>{
    const sql = 'SELECT * FROM items WHERE id = $1';

    return db.query<ItemRow>(sql, [id])
    .then(result => result.rows.map(r => Item.from(r))[0]);
}

export function createItem(item: Item): Promise<Item>{
    const sql = 'INSERT INTO items (category, product_name, price, quantity_left) \
    VALUES ($1, $2, $3, $4) RETURNING *';

    return db.query<ItemRow>(sql, [
        item.category,
        item.productName,
        item.price,
        item.quantityLeft
    ]).then(result => result.rows.map(row => Item.from(row))[0]);
}

// update the item
export function patchItem(item: Item): Promise<Item>{
    const sql = `UPDATE items SET category = COALESCE($1, category), \
    product_name = COALESCE($2, product_name), price = COALESCE($3, price), \
    quantity_left = COALESCE($4, quantity_left) \
    WHERE id = $5 RETURNING *`;

    return db.query<ItemRow>(sql, [
        item.category,
        item.productName,
        item.price,
        item.quantityLeft,
        item.id
    ]).then(result => result.rows.map(r => Item.from(r))[0]);;
}

export function deleteItem(item: Item): Promise<Item> {
    const sql = 'DELETE FROM items WHERE id = $1';

    return db.query<ItemRow>(sql, [
        item.id
    ]).then(result => result.rows.map(r => Item.from(r))[0]);
}