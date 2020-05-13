import express from 'express';
import * as itemService from '../services/item-service';

export const itemRouter = express.Router();

const items = [];

// read all the selected items
itemRouter.get('', (request, response, next) => {
    itemService.getAllItems().then(items => {
        console.log("request recieved- item-router");
        response.json(items);
        next();
    
    }).catch(err => {
        console.log(err);
        response.sendStatus(500);
    });
});

// read the id of selected item
itemRouter.get('/:id', (request, response, next) =>{
    const id = +request.params.id;

    itemService.getSelectItem(id).then(item => {
        if(!item)
        {
            response.sendStatus(404);
        }
        else{
            response.json(item);
        }
    });
});

// update the id of the selected item
itemRouter.patch('/:id', (request, response, next) => {
    const item = request.body;

    itemService.patchItem(item)
    .then(updateItem => {
        response.json(updateItem);
    }).catch(err => {
        console.log(err);
        response.sendStatus(500);
    }).finally(() => {
        next();
    })
});

// delete the selected item
itemRouter.delete('/:id', (request, response, next) => {
    const item = request.body;

    itemService.deleteItem(item)
    .then(deletedItem => {
        response.json(deletedItem);
    }).catch(err => {
        console.log(err);
        response.sendStatus(500);
    });
});

itemRouter.post('', (request, response, next) => {
    const item = request.body;
    itemService.createItem(item)
    .then(newItem => {
        response.json(newItem);
    }).catch(err => {
        console.log('err');
        response.sendStatus(500);
    }).finally(() => {
        next();
    })
});

itemRouter.post('/:id', (request, response, next) => {
    const item = request.body;
    itemService.addItemToCart(item)
    .then(newItem => {
        response.json(newItem);
    }).catch(err => {
        console.log(err);
        response.sendStatus(500);
    }).finally(() => {
        next();
    })
});