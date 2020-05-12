import express from 'express';
import * as cartService from '../services/shoppingCart-service';


export const cartRouter = express.Router();

// get all of the items in the shopping cart
cartRouter.get('', (request, response, next) => {
    cartService.getShoppingCart().then(items => {
        console.log("request - shoppingcart-router");
        response.json(items);
    }).catch(err => {
        console.log(err);
        response.sendStatus(500);
    });
});

// get selected item from the cart
/*
cartRouter.get('/:id', (request, response, next) => {
    const id = +request.params.id;

   // cartService.
})
 */

 // remove an item from your shopping cart
 cartRouter.delete('/:id', (request, response, next) => {
    const item = request.body;
     cartService.deleteShoppingCart(item)
     .then(deletedItem => {
         response.json(deletedItem);
     }).catch(err => {
         console.log(err);
         response.sendStatus(500);
     });
 });

 // add another item to your cart
 cartRouter.post('', (request, response, next) => {
     const item = request.body;

     cartService.createShoppingCart(item)
     .then(createdItem => {
         response.json(createdItem);
     }).catch(err => {
         console.log(err);
         response.sendStatus(500);
     }).finally(() => {
         next();
     })
 })